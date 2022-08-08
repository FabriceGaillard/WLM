import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreMessageValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        userIds: schema.array().members(schema.string([rules.uuid()])),
        content: schema.string({ trim: true, escape: true }, [rules.minLength(1)]),
    })

    public messages: CustomMessages = {}
}
