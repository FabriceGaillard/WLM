import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailSendingFail extends Exception {
    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: `E_EMAIL_SENDING_FAIL: Email sending fail.`
            }]
        })
    }
}
