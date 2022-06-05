import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import Drive from '@ioc:Adonis/Core/Drive'
export default class UsersController {
    private readonly AVATAR_UPLOAD_DIR = 'avatar'

    public async index() {
        return await User.all()
    }

    public async show({ request }: HttpContextContract) {
        return await User.find(request.params().id)
    }

    public async update({ request, response }: HttpContextContract) {
        const { avatar, ...payload } = await request.validate(UpdateUserValidator)
        const user = await User.find(request.params().id)

        if (!user) {
            return response.noContent()
        }

        if (avatar) {
            await Drive.delete(user.avatar)
            await avatar.moveToDisk(`./${this.AVATAR_UPLOAD_DIR}`)
            user.avatar = `${this.AVATAR_UPLOAD_DIR}/${avatar?.fileName}`
        }

        await user.merge(payload).save()
        return user
    }

    public async destroy({ response, request }: HttpContextContract) {
        const user = await User.find(request.params().id)

        if (user) {
            await Drive.delete(user.avatar)
            await user.delete()
        }

        response.noContent()
    }
}
