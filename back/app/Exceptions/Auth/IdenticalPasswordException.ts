import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IdenticalPasswordException extends Exception {

    constructor() {
        super('E_INVALID_PASSWORD: Identical of previous passwords.')
    }

    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: this.message
            }]
        })
    }
}
