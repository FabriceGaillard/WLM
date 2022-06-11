import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UpdateEmailUserValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        params: schema.object().members({
            id: schema.string({}, [rules.uuid()])
        }),
        oldEmail: schema.string({}, [
            rules.email()
        ]),
        newEmail: schema.string({}, [
            rules.different('oldEmail'),
            rules.unique({ table: 'users', column: 'email' }),
            rules.email(),
        ]),
    })

    public messages = {}
}