import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRelationship from 'App/Models/UserRelationship'
import User from 'App/Models/User';
import DestroyContactValidator from 'App/Validators/UserRelationship/DestroyUserRelationshipValidator';
import IndexUserRelationshipValidator from 'App/Validators/UserRelationship/IndexUserRelationshipValidator';
import ShowUserRelationshipValidator from 'App/Validators/UserRelationship/ShowUserRelationshipValidator';
import StoreUserRelationshipValidator from 'App/Validators/UserRelationship/StoreUserRelationshipValidator'

export default class UserRelationshipsController {
    public async index({ auth, request, bouncer, response }: HttpContextContract) {
        const payload = await request.validate(IndexUserRelationshipValidator)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('viewList', payload.params.userId)

        await auth.user!.load('userRelationships', (q) => q.preload('relatedUser'))
        return response.ok(auth.user!.userRelationships)
    }

    public async show({ request, bouncer, response }: HttpContextContract) {
        const payload = await request.validate(ShowUserRelationshipValidator)
        const userRelationship = await UserRelationship.query()
            .where('relatingUserId', payload.params.userId)
            .andWhere('relatedUserId', payload.params.id)
            .first()

        if (!userRelationship) {
            return response.notFound()
        }

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('view', userRelationship)

        await userRelationship.load('relatedUser')
        return response.ok(userRelationship)
    }

    public async store({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(StoreUserRelationshipValidator)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('create', payload.params.userId)

        const contact = await User.find(payload.contactId)
        if (!contact) {
            return response.notFound()
        }

        try {
            await UserRelationship.create({
                relatingUserId: payload.params.userId,
                relatedUserId: contact.id
            })
        } catch (err) {
            return response.badRequest()
        }


        return response.created()
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        const payload = await request.validate(DestroyContactValidator)
        const userRelationship = await UserRelationship.query()
            .where('relatingUserId', payload.params.userId)
            .andWhere('relatedUserId', payload.params.id)
            .first()

        if (!userRelationship) {
            return response.notFound()
        }

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('view', userRelationship)

        await userRelationship.delete()
        return response.noContent()
    }

}
