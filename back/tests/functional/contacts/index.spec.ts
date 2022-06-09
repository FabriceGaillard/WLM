import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/contacts'


test.group('Contacts index', () => {
    test(`it should FAIL (401) when user is not authenticated`, async ({ client }) => {
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

    test(`it should return list of contacts`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(ENDPOINT).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)

        await user.load('contacts', (q) => q.preload('contact'))
        response.assertBodyContains(user.contacts.map(contact => contact.serialize()))
    })
})
