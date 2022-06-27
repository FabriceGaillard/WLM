import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvalidAlternateEmailException extends Exception {

    constructor() {
        super('E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email.')
    }

    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: this.message
            }]
        })
    }
}
