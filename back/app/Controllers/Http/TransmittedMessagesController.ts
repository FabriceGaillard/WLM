import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import MarkAsReadedTransmittedMessageValidator from 'App/Validators/TransmittedMessage/MarkAsReadedTransmittedMessageValidator'
import { Status } from 'Database/migrations/1657653513590_transmitted_messages'
import { DateTime } from 'luxon'


export default class TransmittedMessagesController {

    public async markAsReaded({ request, response, auth }: HttpContextContract) {
        const { messageIds } = await request.validate(MarkAsReadedTransmittedMessageValidator)
        const messages = await auth.user!
            .related('messages')
            .query()
            .whereIn('messages.id', messageIds)
            .andWherePivot('user_id', auth.user!.id)
            .andWhereNotPivot('status', Status.BLOCKED)

        if (messages.length !== messageIds.length) {
            return response.badRequest()
        }

        await Database.from('transmitted_messages')
            .whereIn('message_id', messageIds)
            .andWhere('user_id', auth.user!.id)
            .update({ status: Status.READED, updated_at: DateTime.now() })

    }


}
