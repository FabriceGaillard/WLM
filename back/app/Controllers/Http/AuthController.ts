import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import VerifyEmail from 'App/Mailers/VerifyEmail'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'
import RegisterValidator from 'App/Validators/Auth/RegisterValidator'
import Route from '@ioc:Adonis/Core/Route'
import { DateTime } from 'luxon'
import InvalidSignedUrlException from 'App/Exceptions/Auth/InvalidSignedUrlException'
import ConfirmAccount from 'App/Mailers/ConfirmAccount'

export default class AuthController {
    public async login({ auth, request }: HttpContextContract) {
        const payload = await request.validate(LoginValidator)
        try {
            const user: User = await auth.use('web').attempt(payload.email, payload.password)
            if (Hash.needsReHash(user.password)) {
                user.password = await Hash.make(payload.password)
            }
            return user;
        } catch (e) {
            throw new InvalidCredentialException('Invalid credentials.', 400, 'E_INVALID_CREDENTIALS')
        }
    }

    public async register({ logger, request, response }: HttpContextContract) {
        const payload = await request.validate(RegisterValidator)
        const signedUrl = Route.makeSignedUrl('confirmAccount', {
            email: payload.email,
        })
        try {
            const mailer = new VerifyEmail(payload.email, signedUrl)
            mailer.send()
        } catch (error) {
            logger.info(error)
            return response.badRequest()
        }

        await User.create(payload);
        return response.noContent()
    }

    public async confirmAccount({ request, response }: HttpContextContract) {
        if (!request.hasValidSignature()) {
            throw new InvalidSignedUrlException('Signature is missing or URL was tampered.')
        }

        const user = await User.findBy('email', request.param('email'))
        if (user && user.confirmedAt !== null) {
            await user.merge({ confirmedAt: DateTime.now() }).save()

            const mailer = new ConfirmAccount(user)
            mailer.send()
        }

        response.noContent()
    }
}
