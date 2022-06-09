import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/users'


test.group('Users destroy', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (401) when uuid is invalid', async ({ client }) => {
        const response = await client.delete(`${ENDPOINT}/anInvalidUuid`)
        response.assertAgainstApiSpec()
        response.assertStatus(401)
    })

    test('it should FAIL (422) when id is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/anInvalidUuid`).json({}).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "uuid",
                    "field": "params.id",
                    "message": "uuid validation failed",
                },
            ],
        })
    })

    test('it should FAIL (401) when user is not authenticated', async ({ client }) => {
        const response = await client.delete(`${ENDPOINT}/123e4567-e89b-12d3-a456-426614174000`)
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

    test('it should FAIL (404) when user is not found', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.delete(`${ENDPOINT}/373fa2b6-8a06-4538-83cc-9f56cf212782`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(404)
        response.assertBody({})
    })

    test('it should FAIL (403) when user is not the owner account', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.create({ ...bot, email: 'user2@gmail.com' })
        const response = await client.delete(`${ENDPOINT}/${user2.id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test('it should delete user', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.delete(`${ENDPOINT}/${user.id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(204)
        response.assertBody({})
    })

    /*     test('it should delete avatar when he is store into temp/uploads/avatar', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.delete(`${ENDPOINT}/${user.id}`).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(204)
            response.assertBody({})
        }) */
})
