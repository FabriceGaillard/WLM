import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { gender } from 'App/Models/User'
import { DateTime } from 'luxon'

export default class StoreUserValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        email: schema.string({}, [
            rules.unique({ table: 'users', column: 'email' }),
            rules.email(),
        ]),
        password: schema.string({}, [
            rules.maxLength(180),
            rules.confirmed('passwordConfirmation'),
            rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[\w\W]{12,}$/)
        ]),
        firstName: schema.string(
            { escape: true, trim: true },
            [
                rules.maxLength(255),
                rules.regex(/^(?:(?!×Þß÷þ)[A-Za-zÀ-ÿ' -])+$/)
            ]
        ),
        lastName: schema.string(
            { escape: true, trim: true },
            [
                rules.maxLength(255),
                rules.regex(/^(?:(?!×Þß÷þ)[A-Za-zÀ-ÿ' -])+$/)
            ]
        ),
        gender: schema.enum(
            Object.values(gender)
        ),
        birthYear: schema.number.optional([
            rules.range(DateTime.now().year - 130, DateTime.now().year)
        ]),
        alternateEmail: schema.string({}, [
            rules.email(),
            rules.different('email')
        ]),
        state: schema.string.optional(
            { escape: true, trim: true },
            [
                rules.maxLength(255),
                rules.regex(/^(?:(?!×Þß÷þ)[A-Za-zÀ-ÿ' -])+$/)
            ]
        ),
        zipCode: schema.string.optional({}, [
            rules.regex(/^(?:2A|2B|\d{2})\d{3}$/)
        ]),
    })

    /**
     * Custom messages for validation failures. You can make use of dot notation `(.)`
     * for targeting nested fields and array expressions `(*)` for targeting all
     * children of an array. For example:
     *
     * {
     *   'profile.username.required': 'Username is required',
     *   'scores.*.number': 'Define scores as valid numbers'
     * }
     *
     */
    public messages = {
        'zipCode.regex': 'zipCode must be equal to five numerics characters',
        'password.regex': 'password must contain 12 character minimum with at least:\nOne minuscule\nOne majuscule\nOne numeric\nOne alphabetic character\nOne special character'
    }
}