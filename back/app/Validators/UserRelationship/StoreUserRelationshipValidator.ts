import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserRelationshipValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        params: schema.object().members({
            userId: schema.string({}, [rules.uuid()])
        }),
        contactId: schema.string({}, [rules.uuid()])
    })

    public messages = {}
}
