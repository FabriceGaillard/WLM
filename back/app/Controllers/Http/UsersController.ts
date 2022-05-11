import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/User/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'

export default class UsersController {
    public async index() {
        return await User.all()
    }

    public async show({ request }: HttpContextContract) {
        return await User.findOrFail(request.params().id)
    }

    public async store({ response, request }: HttpContextContract) {
        const payload = await request.validate(StoreUserValidator)
        const user = await User.create(payload);
        response.created(user)
    }

    public async update({ request }: HttpContextContract) {
        const payload = await request.validate(UpdateUserValidator)
        const user = await User.findOrFail(request.params().id)
        await user.merge(payload).save()
        return user
    }

    public async destroy({ response, request }: HttpContextContract) {
        await User.query().where('id', request.params().id).delete()
        response.noContent()
    }
}
