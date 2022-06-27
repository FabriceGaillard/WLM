import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailSendingFail extends Exception {

    constructor() {
        super('E_EMAIL_SENDING_FAIL: Email sending fail.')
    }

    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: this.message
            }]
        })
    }
}
