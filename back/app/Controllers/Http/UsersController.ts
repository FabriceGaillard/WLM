import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import Drive from '@ioc:Adonis/Core/Drive'

export const AVATAR_UPLOAD_DIR = 'avatar'
export default class UsersController {

    public async index() {
        return await User.all()
    }

    public async show({ request }: HttpContextContract) {
        return await User.find(request.params().id)
    }

    public async update({ request, response, bouncer }: HttpContextContract) {
        const { avatar, ...payload } = await request.validate(UpdateUserValidator)
        const user = await User.find(request.params().id)

        if (!user) return

        await bouncer
            .with('UserPolicy')
            .authorize('update', user)

        if (avatar) {
            await Drive.delete(user.avatar)
            await avatar.moveToDisk(`./${AVATAR_UPLOAD_DIR}`)
            user.avatar = `${AVATAR_UPLOAD_DIR}/${avatar?.fileName}`
        }

        await user.merge(payload).save()
        return user
    }

    public async destroy({ request, bouncer }: HttpContextContract) {
        const user = await User.find(request.params().id)

        if (!user) return

        await bouncer
            .with('UserPolicy')
            .authorize('delete', user)

        await Drive.delete(user.avatar)
        await user.delete()

        return
    }
}
