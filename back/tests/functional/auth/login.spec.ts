import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'

const ENDPOINT = 'api/auth/login'

test.group('Auth login', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test(`should login ${bot.email}`, async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
            password: bot.password,
        })
        ResponseAssertHelper.minimalAssert(response, 200)
        const user = await User.findByOrFail('email', bot.email)
        response.assertBody(user.serialize())
    })

    test(`should login ${bot.email} and set rememberMeToken`, async ({ client, assert }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
            password: bot.password,
            remember: true
        })
        ResponseAssertHelper.minimalAssert(response, 200)
        const user = await User.findByOrFail('email', bot.email)
        assert.isNotNull(user.rememberMeToken)
    })

    test('should FAIL (422) if email is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@@gmail.com',
            password: bot.password,
        })
        ResponseAssertHelper.error422(response, [RulesHelper.email('email')])
    })

    test('should FAIL (422) if email is undefined', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            password: bot.password,
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('email')])

    })

    test('should FAIL (422) if password is undefined', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        ResponseAssertHelper.error422(response, [RulesHelper.required('password')])
    })

    test('should FAIL (400) if user is not found', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@gmail.com',
            password: bot.password,
        })
        ResponseAssertHelper.error400(response, { errors: [{ message: new InvalidCredentialException().message }] })
    })

    test('should FAIL (400) if password is incorrect', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
            password: 'anIncorrectPassword',
        })
        ResponseAssertHelper.error400(response, {
            errors: [
                {
                    message: "E_INVALID_AUTH_PASSWORD: Password mis-match",
                },
            ],
        })

    })

})
