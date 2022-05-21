import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { gender, status } from 'App/Models/User'
import { DateTime } from 'luxon'
export default class UpdateUserValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        email: schema.string.optional({}, [
            rules.unique({ table: 'users', column: 'email' }),
            rules.maxLength(255),
            rules.email()
        ]),
        password: schema.string.optional({}, [
            rules.maxLength(180),
            rules.confirmed('passwordConfirmation'),
            rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z\d\W]{12,}$/)
        ]),
        username: schema.string.optional(
            { escape: true, trim: true },
            [rules.maxLength(255)]
        ),
        avatar: schema.string.optional(
            { escape: true, trim: true },
            [rules.maxLength(255)]
        ),
        status: schema.enum.optional(
            Object.values(status)
        ),
        personalMessage: schema.string.optional(
            { escape: true, trim: true },
            [rules.maxLength(255)]
        ),
        firstName: schema.string.optional(
            { escape: true, trim: true },
            [
                rules.maxLength(255),
                rules.regex(/^(?:(?!×Þß÷þ)[A-Za-zÀ-ÿ' -])+$/)
            ]
        ),
        lastName: schema.string.optional(
            { escape: true, trim: true },
            [
                rules.maxLength(255),
                rules.regex(/^(?:(?!×Þß÷þ)[A-Za-zÀ-ÿ' -])+$/)
            ]
        ),
        gender: schema.enum.optional(
            Object.values(gender)
        ),
        birthYear: schema.number.optional([
            rules.range(DateTime.now().year - 130, DateTime.now().year)
        ]),
        alternateEmail: schema.string.optional({}, [
            rules.email(),
            rules.maxLength(255),
            rules.requiredIfExists('email'),
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
        ])
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
        'password.regex': 'password must contain 12 character minimum with at least:\nOne minuscule\nOne majuscule\nOne numeric\nOne special character'
    }
}