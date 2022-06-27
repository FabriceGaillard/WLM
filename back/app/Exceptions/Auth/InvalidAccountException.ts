import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new InvalidAccountException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class InvalidAccountException extends Exception {

    constructor() {
        super('E_INVALID_ACCOUNT: Invalid account.')
    }

    public async handle(_: this, { response }: HttpContextContract) {
        response.badRequest({
            errors: [{
                message: 'E_INVALID_ACCOUNT: Invalid account.'
            }]
        })
    }
}
