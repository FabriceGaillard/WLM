import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyEmailAuthValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        params: schema.object().members({
            email: schema.string({}, [rules.email()])
        })
    })

    public messages = {}
}
