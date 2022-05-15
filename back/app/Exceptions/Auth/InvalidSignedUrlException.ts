import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InvalidSignedUrlException extends Exception {
    public async handle(error: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: error.message
            }]
        })
    }
}
