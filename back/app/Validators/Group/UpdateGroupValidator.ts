import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateGroupValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        params: schema.object().members({
            id: schema.string({}, [rules.uuid()])
        }),
        name: schema.string.optional(
            { escape: true, trim: true },
            [rules.maxLength(255)]
        )
    })

    public messages = {}
}
