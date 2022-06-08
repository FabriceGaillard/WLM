import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvalidAlternateEmailException extends Exception {
    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: 'E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email.'
            }]
        })
    }
}
