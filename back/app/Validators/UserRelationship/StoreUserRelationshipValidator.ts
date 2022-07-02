import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserRelationshipValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        relatedUserEmail: schema.string([rules.email()])
    })

    public messages = {}
}
