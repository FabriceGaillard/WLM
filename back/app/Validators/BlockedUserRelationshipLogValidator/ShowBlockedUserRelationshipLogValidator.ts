import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShowBlockedUserRelationshipLogValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        params: schema.object().members({
            id: schema.string([rules.uuid()]),
        })
    })

    public messages = {}
}
