import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Message, { Type } from 'App/Models/Message'
import User from 'App/Models/User'
import LatestMessageValidator from 'App/Validators/Message/LatestMessageValidator'
import StoreMessageValidator from 'App/Validators/Message/StoreMessageValidator'
import { Status } from 'Database/migrations/1657653513590_transmitted_messages'

const LATEST_MESSAGE_LENGTH = 10

export default class MessagesController {

    /**
     * 
     * @param {HttpContextContract} param0 
     * @returns History of 10 latest messages (readed) for a conversion/user(s)
     */
    public async history({ request, response, auth }: HttpContextContract) {
        const { userIds } = await request.validate(LatestMessageValidator)

        const me = auth.user!.id

        const req = Database.from('transmitted_messages')
            .whereIn('user_id', userIds.concat([me]))
            .andWhere(
                'message_id',
                Database
                    .from('transmitted_messages')
                    .where('user_id', me)
                    .andWhere('status', Status.READED)
                    .select('message_id')
                    .limit(LATEST_MESSAGE_LENGTH)
            )
            .andHavingRaw('COUNT(message_id) = ?', [userIds.length])
            .groupBy('message_id')
            .select('message_id')
            .limit(LATEST_MESSAGE_LENGTH)

        const messages = await Message.query()
            //send by me
            .where((q) => q
                .where('userId', me)
                .andWhereIn('id', Database.from('transmitted_messages')
                    .whereIn('user_id', userIds)
                    .andHavingRaw('COUNT(message_id) = ?', [userIds.length])
                    .groupBy('message_id')
                    .select('message_id')
                    .limit(LATEST_MESSAGE_LENGTH)
                )
            )
            //received by me and userIds, expediate by one of userIds
            .orWhere((q) => q
                .whereIn('id', req)
                .andWhereIn('userId', userIds)
            )
            //received by me and userIds, expediate by an other one (not me or userIds)
            .orWhere((q) => q.whereIn('id', req))

        return response.ok(messages.map(message => message.serialize()))
    }


    /**
     * 
     * @param param0 
     * @returns All unreaded messages, all conversation combined
     */
    public async unreaded({ response, auth }: HttpContextContract) {
        const me = auth.user!.id

        const messages = await Message.query()
            .whereIn('id', Database
                .from('transmitted_messages')
                .where('user_id', me)
                .andWhere('status', Status.PENDING)
                .select('message_id'))
            .preload('relatedUsers', (q) => q.select('id', 'username'))

        const result = {}
        for (const message of messages) {
            const relatedUserIds = message.relatedUsers.map(r => r.id).sort().toString()
            if (!result[relatedUserIds]) {
                result[relatedUserIds] = {
                    relatedUsers: message.relatedUsers.map(relatedUser => relatedUser.serializeAttributes()),
                    messages: []
                }
            }
            result[relatedUserIds].messages = message.serializeAttributes()
        }

        return response.ok(Object.values(result))
    }

    public async store({ request, response, auth }: HttpContextContract) {
        const { userIds, content } = await request.validate(StoreMessageValidator)

        const recipients = await User.findMany(userIds)
        if (recipients.length !== userIds.length) return response.badRequest()

        //store message
        const message = await Message.create({
            content: content,
            userId: auth.user!.id,
            type: Type.MESSAGE
        })

        //get relationship blocked
        await auth.user!.related('userRelationships').query().where('status', Status.BLOCKED)
        const blockedRelationshipIds = auth.user!.userRelationships.map(relationship => relationship.id)

        //store transmitted messages
        await message.related('relatedUsers').attach(
            userIds
                .reduce((acc, id) =>
                    Object.assign(acc, { [id]: { status: blockedRelationshipIds.includes(id) ? Status.BLOCKED : Status.PENDING } })
                    , {}))

        return response.noContent()
    }

}
