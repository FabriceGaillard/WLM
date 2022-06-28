import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Group from 'App/Models/Group'
import DestroyGroupValidator from 'App/Validators/Group/DestroyGroupValidator'
import ShowGroupValidator from 'App/Validators/Group/ShowGroupValidator'
import StoreGroupValidator from 'App/Validators/Group/StoreGroupValidator'
import UpdateGroupValidator from 'App/Validators/Group/UpdateGroupValidator'

export default class GroupsController {
    public async index({ auth, response }: HttpContextContract) {
        const groups = await Group.query().where('userId', auth.user!.id)
        return response.ok(groups)
    }

    public async show({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(ShowGroupValidator)

        const group = await Group.findOrFail(payload.params.id)

        await bouncer
            .with('GroupPolicy')
            .authorize('view', group)

        return response.ok(group)
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const payload = await request.validate(StoreGroupValidator)
        const group = await Group.create(Object.assign(payload, { userId: auth.user!.id }))
        return response.created(group)
    }

    public async destroy({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(DestroyGroupValidator)
        const group = await Group.findOrFail(payload.params.id)

        await bouncer
            .with('GroupPolicy')
            .authorize('destroy', group)

        await group.delete()

        return response.noContent()
    }

    public async update({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(UpdateGroupValidator)

        const group = await Group.findOrFail(payload.params.id)

        await bouncer
            .with('GroupPolicy')
            .authorize('update', group)

        await group.merge({ name: payload.name }).save()

        return response.ok(group)
    }
}
