import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/Auth/LoginValidator'

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
}
