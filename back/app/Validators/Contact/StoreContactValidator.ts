import { rules, schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreContactValidator {
    constructor(protected ctx: HttpContextContract) { }
    public schema = schema.create({
        contactId: schema.string({}, [rules.uuid()])
    })

    public messages = {}
}
