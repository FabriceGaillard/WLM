import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/contacts'

test.group('Contacts destroy', () => {
    test(`it should FAIL (401) user si not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('contacts')
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

    test(`it should FAIL (422) when id is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('contacts')
        const response = await client.delete(`${ENDPOINT}/anInvalidUuid`).loginAs(user)
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

    test(`it should FAIL (404) when contact is not found`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('contacts')
        const response = await client.delete(`${ENDPOINT}/373fa2b6-8a06-4538-83cc-9f56cf212782`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(404)
        response.assertBody({})
    })

    test(`it should create contact (204)`, async ({ client, assert }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('contacts')
        const id = user.contacts[0].id
        const response = await client.delete(`${ENDPOINT}/${id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(204)

        await user.load('contacts')
        assert.notEqual(user.contacts[0].id, id)
    })
})
