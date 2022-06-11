import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/User/UpdateUserValidator'
import Drive from '@ioc:Adonis/Core/Drive'
import InvalidAlternateEmailException from 'App/Exceptions/User/InvalidAlternateEmailException'
import DestroyUserValidator from 'App/Validators/User/DestroyUserValidator'
import InvalidAccountException from 'App/Exceptions/Auth/InvalidAccountException'
import UpdatePasswordUserValidator from 'App/Validators/User/UpdatePasswordUserValidator'
import Hash from '@ioc:Adonis/Core/Hash'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import UpdateEmailUserValidator from 'App/Validators/User/UpdateEmailUserValidator copy'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import CautionChangementEmail from 'App/Mailers/CautionChangementEmail'
import Route from '@ioc:Adonis/Core/Route'
import EmailSendingFail from 'App/Exceptions/Auth/EmailSendingFail'


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

    public async updatePassword({ request, bouncer, response }: HttpContextContract) {
        const payload = await request.validate(UpdatePasswordUserValidator)
        const user = await User.find(payload.params.id)

        if (!user) return response.noContent()

        await bouncer
            .with('UserPolicy')
            .authorize('update', user)

        if (!user?.verifiedAt) throw new InvalidAccountException('Invalid account.')
        if (!(await Hash.verify(user.password, payload.oldPassword))) {
            throw new InvalidCredentialException('Invalid credentials.')
        }

        await user.merge({ password: payload.newPassword }).save()
        return response.noContent()
    }

    public async updateEmail({ request, bouncer, response, logger }: HttpContextContract) {
        const payload = await request.validate(UpdateEmailUserValidator)
        const user = await User.find(payload.params.id)
        if (!user) return response.notFound()

        await bouncer
            .with('UserPolicy')
            .authorize('update', user)

        if (!user.verifiedAt) throw new InvalidAccountException('Invalid account.')
        if (user.email !== payload.oldEmail) return response.badRequest()
        if (user.alternateEmail === payload.newEmail) {
            throw new InvalidAlternateEmailException('E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email.')
        }

        try {
            const mailer = new CautionChangementEmail(payload.oldEmail)
            await mailer.send()
        } catch (error) { }

        const signedUrl = Route.makeSignedUrl('verifyEmail', { email: payload.newEmail })
        try {
            const mailer = new VerifyEmail(payload.newEmail, signedUrl)
            await mailer.send()
        } catch (error) {
            logger.warn(error)
            throw new EmailSendingFail('E_EMAIL_SENDING_FAIL: Email sending fail.')
        }

        await user.merge({ email: payload.newEmail }).save()
        return response.noContent()
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
