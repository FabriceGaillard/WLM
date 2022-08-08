import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MarkAsReadedTransmittedMessageValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        messageIds: schema.array().members(schema.string([rules.uuid()]))
    })

    public messages: CustomMessages = {}
}
