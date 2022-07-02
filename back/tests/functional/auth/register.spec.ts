import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import User from 'App/Models/User'
import { DateTime } from 'luxon'
const ENDPOINT = 'api/auth/register'
const validEmail = "fabou291@gmail.com"
const registerBody = {
    "email": "fabou291@gmail.com",
    "password": "TESTtest1234.",
    "passwordConfirmation": "TESTtest1234.",
    "firstName": "Fab",
    "lastName": "G",
    "gender": "male",
    "birthYear": "2022",
    "alternateEmail": "test@bot.com",
    "state": "Somewhere",
    "zipCode": "2A090",
}

test.group('Auth register', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    // Over 74 character, an email is considered invalid
    test('should FAIL (422) when email is not a valid email', async ({ client }) => {
        const invalidEmail = 'anInvalidEmail@@gmail.com.fr'
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            email: invalidEmail
        })
        ResponseAssertHelper.error422(response, [RulesHelper.email('email')])
    })

    test('should FAIL (422) when email is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            email: undefined
        })
        ResponseAssertHelper.error422(response, [
            RulesHelper.required('email'),
            RulesHelper.different('alternateEmail'),
        ])
    })

    test('should FAIL (422) when email is not unique', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            email: 'bot@example.com'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.unique('email', 'unique validation failure')])
    })

    test('should FAIL (422) when alternateEmail is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            alternateEmail: 'anInvalidEmail@@gmail.com.fr'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.email('alternateEmail')])
    })

    test('should FAIL (422) when alternateEmail is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            alternateEmail: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('alternateEmail')])
    })

    test('should FAIL (422) when alternatelEmail is identic of email', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            email: validEmail,
            alternateEmail: validEmail,
        })
        ResponseAssertHelper.error422(response, [RulesHelper.different('alternateEmail')])
    })

    test('should FAIL (422) when password is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            password: 'anInvalidPassword',
            passwordConfirmation: 'anInvalidPassword',
        })
        ResponseAssertHelper.error422(response, [RulesHelper.regex('password', "password must contain 12 character minimum with at least:\nOne minuscule\nOne majuscule\nOne numeric\nOne alphabetic character\nOne special character")])
    })

    test('should FAIL (422) when password is over 180 characters', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            password: ('aA1+').repeat(100),
            passwordConfirmation: ('aA1+').repeat(100),
        })
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('password', 180)])
    })

    test('should FAIL (422) when password is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            password: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('password')])
    })

    test('should FAIL (422) when passwordConfirmation is different of password', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            passwordConfirmation: 'anInvalidPassword'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.confirmed('passwordConfirmation')])
    })

    test('should FAIL (422) when passwordConfirmation is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            passwordConfirmation: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.confirmed('passwordConfirmation')])
    })

    test('should FAIL (422) when firstName do not respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            firstName: '02Fabrice'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.regex('firstName')])
    })

    test('should FAIL (422) when firstName is over 255 character', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            firstName: 'a'.repeat(256)
        })
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('firstName', 255)])
    })

    test('should FAIL (422) when firstName is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            firstName: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('firstName')])
    })

    test('should FAIL (422) when lastName did not respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            lastName: '02G'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.regex('lastName')])
    })

    test('should FAIL (422) when lastName is over 255 character', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            lastName: 'a'.repeat(256)
        })
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('lastName', 255)])
    })

    test('should FAIL (422) when lastName is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            lastName: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('lastName')])
    })

    test('should FAIL (422) when gender is not in range of specified value', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            gender: 'anInvalidGender'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.enum('gender', [
            "male",
            "female",
            "unbinary",
        ])])
    })

    test('should FAIL (422) when gender is missing', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            gender: undefined
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('gender')])
    })

    test('should FAIL (422) when birthyear is not between before 130 year and today', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            birthYear: 1800
        })

        ResponseAssertHelper.error422(response, [RulesHelper.range('birthYear', { start: DateTime.now().year - 130, stop: DateTime.now().year })])
    })

    test('should FAIL (422) when birthyear is not a digital value', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            birthYear: 'stringValue'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.number('birthYear')])
    })

    test('should FAIL (422) when state did not respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            state: '678invalidState'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.regex('state')])
    })

    test('should FAIL (422) when state is over 255 characters', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            state: 'a'.repeat(256)
        })
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('state', 255)])
    })

    test('should FAIL (422) when zipCode doesn\'t respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...registerBody,
            zipCode: '2C678'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.regex('zipCode', "zipCode must be equal to five numerics characters")])
    })

    test('should FAIL (400) when email sending fails', async ({ client, assert }) => {
        const email = "bot@test.com"
        const response = await client.post('/api/auth/register').json({
            ...registerBody,
            email
        })
        ResponseAssertHelper.error400(response)
        const user = await User.findBy('email', email)
        assert.notExists(user)
    })

    test(`should register ${validEmail} like an unverified account`, async ({ client, assert }) => {
        const response = await client.post('/api/auth/register').json(registerBody)
        ResponseAssertHelper.minimalAssert(response, 201)
        const user = await User.findByOrFail('email', validEmail)
        assert.isNull(user.verifiedAt)
    })
})
