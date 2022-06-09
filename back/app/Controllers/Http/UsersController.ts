import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import InvalidAlternateEmailException from 'App/Exceptions/User/InvalidAlternateEmailException'
import DestroyUserValidator from 'App/Validators/User/DestroyUserValidator'

export const AVATAR_UPLOAD_DIR = 'avatar'
export default class UsersController {

    public async update({ request, bouncer, response }: HttpContextContract) {
        const { avatar, alternateEmail, ...payload } = await request.validate(UpdateUserValidator)
        const user = await User.find(payload.params.id)

        if (!user) return response.noContent()

        if (alternateEmail && user.email === alternateEmail) {
            throw new InvalidAlternateEmailException('E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email.')
        }

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

    public async destroy({ request, bouncer, response }: HttpContextContract) {
        const payload = await request.validate(DestroyUserValidator)
        const user = await User.find(payload.params.id)

        if (!user) return response.notFound()

        await bouncer
            .with('UserPolicy')
            .authorize('delete', user)

        await Drive.delete(user.avatar)
        await user.delete()

        return response.noContent()
    }
}
