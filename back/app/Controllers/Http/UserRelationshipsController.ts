import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRelationship from 'App/Models/UserRelationship'
import User from 'App/Models/User';
import ShowUserRelationshipValidator from 'App/Validators/UserRelationship/ShowUserRelationshipValidator';
import StoreUserRelationshipValidator from 'App/Validators/UserRelationship/StoreUserRelationshipValidator';
import UpdateUserRelationshipValidator from 'App/Validators/UserRelationship/UpdateUserRelationshipValidator';

export default class UserRelationshipsController {
    public async indexOfAuthenticatedUser({ auth, response }: HttpContextContract) {
        await auth.user!.load('userRelationships', (q) => q.preload('relatedUser'))
        return response.ok(auth.user!.userRelationships)
    }

    public async show({ request, bouncer, response }: HttpContextContract) {
        const { params } = await request.validate(ShowUserRelationshipValidator)
        const userRelationship = await UserRelationship.findOrFail(params.id)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('view', userRelationship)

        await userRelationship.load('relatedUser')
        return response.ok(userRelationship)
    }

    public async storeOrMakesVisible({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(StoreUserRelationshipValidator)
        const relatedUser = await User.findByOrFail('email', payload.relatedUserEmail)

        let userRelationship: UserRelationship
        try {
            userRelationship = await UserRelationship.updateOrCreate(
                {
                    relatingUserId: auth.user!.id,
                    relatedUserId: relatedUser.id,
                },
                { isHidden: false }
            )

            await userRelationship.load('relatedUser')
        } catch (err) {
            return response.badRequest()
        }

        return response.ok(userRelationship)
    }

    public async update({ request, response, bouncer }: HttpContextContract) {
        const { params, ...payload } = await request.validate(UpdateUserRelationshipValidator)
        const userRelationship = await UserRelationship.findOrFail(params.id)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('update', userRelationship)

        await userRelationship.merge(payload).save()
        await userRelationship.load('relatedUser')
        return response.ok(userRelationship)
    }

}
