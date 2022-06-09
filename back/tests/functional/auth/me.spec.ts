import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'

const ENDPOINT = 'api/auth/me'

test.group('Auth me', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test(`it should FAIL (401) when client is not authenticated`, async ({ client }) => {
        const response = await client.get(ENDPOINT)
        response.assertAgainstApiSpec()
        response.assertStatus(401)
        response.assertBody({
            "errors": [
                {
                    "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access",
                },
            ],
        })
    })

    test(`it should success (200), and return user`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)

        const response = await client.get(ENDPOINT).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)

        response.assertBody({
            ...user.serialize()
        })
    })


})
