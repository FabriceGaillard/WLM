import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/UserSeeder'

const ENDPOINT = 'api/auth/login'

test.group('Auth login', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test(`it should login ${bot.email}`, async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
            password: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(200)

        const user = await User.findBy('email', bot.email)
        response.assertBody(user!.serialize())
    })

    test(`it should login ${bot.email} and set rememberMeToken`, async ({ client, assert }) => {
        await client.post(ENDPOINT).json({
            email: bot.email,
            password: bot.password,
            remember: true
        })

        const user = await User.findBy('email', bot.email)
        assert.isNotNull(user!.rememberMeToken)
    })

    test('it should FAIL (422) if email is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@@gmail.com',
            password: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "email",
                    "field": "email",
                    "message": "email validation failed",
                },
            ],
        })
    })

    test('it should FAIL (422) if email is undefined', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            password: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "email",
                    "message": "required validation failed",
                },
            ],
        })
    })

    test('it should FAIL (422) if password is undefined', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "password",
                    "message": "required validation failed",
                },
            ],
        })
    })

    test('it should FAIL (400) if user is not found', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@gmail.com',
            password: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": "E_INVALID_CREDENTIALS: Invalid credantials.",
                },
            ],
        })
    })

    test('it should FAIL (400) if password is incorrect', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
            password: 'anIncorrectPassword',
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": "E_INVALID_AUTH_PASSWORD: Password mis-match",
                },
            ],
        })
    })

})
