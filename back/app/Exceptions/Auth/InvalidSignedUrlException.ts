import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvalidSignedUrlException extends Exception {

    constructor() {
        super('E_INVALID_SIGNED_URL: Signature is missing or URL was tampered.')
    }

    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: this.message
            }]
        })
    }
}
