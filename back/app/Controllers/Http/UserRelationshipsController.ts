import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRelationship from 'App/Models/UserRelationship'
import User from 'App/Models/User';
import ShowUserRelationshipValidator from 'App/Validators/UserRelationship/ShowUserRelationshipValidator';
import StoreUserRelationshipValidator from 'App/Validators/UserRelationship/StoreUserRelationshipValidator';
import UpdateUserRelationshipValidator from 'App/Validators/UserRelationship/UpdateUserRelationshipValidator';
import BlockUserRelationshipValidator from 'App/Validators/UserRelationship/BlockUserRelationshipValidator';
import UnblockUserRelationshipValidator from 'App/Validators/UserRelationship/UnblockUserRelationshipValidator copy';

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

    /*     public async storeOrMakesVisible2({ request, response, auth }: HttpContextContract) {
            const payload = await request.validate(StoreUserRelationshipValidator)
            const relatedUser = await User.findByOrFail('email', payload.relatedUserEmail)
    
            let userRelationship = await UserRelationship.query()
                .where('relating_user', auth.user!.id)
                .andWhere('related_user', relatedUser.id)
                .first()
    
            try {
                if (!userRelationship) {
                    const userRelationships = await UserRelationship.createMany([{
                        relatingUserId: auth.user!.id,
                        relatedUserId: relatedUser.id,
                    }, {
                        relatedUserId: auth.user!.id,
                        relatingUserId: relatedUser.id,
                        isHidden: true
                    }])
    
                    userRelationship = userRelationships[0]
                } else {
                    await userRelationship.merge({ isHidden: false }).save()
                }
    
                await userRelationship.load('relatedUser')
            } catch (err) {
                return response.badRequest()
            }
    
            return response.ok(userRelationship)
        } */

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

    public async block({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(BlockUserRelationshipValidator)
        const userRelationship = await UserRelationship.findOrFail(payload.params.id)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('update', userRelationship)

        if (userRelationship.isBlocked) return response.badRequest()

        await userRelationship.merge({ isBlocked: true }).save()

        return response.noContent()
    }

    public async unblock({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(UnblockUserRelationshipValidator)
        const userRelationship = await UserRelationship.findOrFail(payload.params.id)

        await bouncer
            .with('UserRelationshipPolicy')
            .authorize('update', userRelationship)

        if (!userRelationship.isBlocked) return response.badRequest()

        await userRelationship.merge({ isBlocked: false }).save()

        return response.noContent()
    }

}
