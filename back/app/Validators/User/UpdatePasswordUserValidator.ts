import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class UpdatePasswordUserValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        params: schema.object().members({
            id: schema.string({}, [rules.uuid()])
        }),
        oldPassword: schema.string(),
        newPassword: schema.string({}, [
            rules.maxLength(180),
            rules.different('oldPassword'),
            rules.confirmed('passwordConfirmation'),
            rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{12,}$/)
        ]),
    })

    public messages = {}
}