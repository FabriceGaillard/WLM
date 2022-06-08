import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/UserSeeder'

const ENDPOINT = 'api/auth/reset-password-demand'

test.group('Auth resetPasswordDemand', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (422) when email is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@@gmail.com',
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

    test('it should FAIL (400) when user is not found', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test('it should FAIL (400) when email sending fails', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test('it should succeed (204)', async ({ client }) => {
        await User.create({ ...bot, email: 'fabou291@gmail.com' })
        const response = await client.post(ENDPOINT).json({
            email: 'fabou291@gmail.com'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(204)
    })

})
