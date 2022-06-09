import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/contacts'

test.group('Contacts store', () => {
    test(`it should FAIL (401) user si not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('contacts')
        const response = await client.post(ENDPOINT)
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

    test(`it should FAIL (422) when contactId is missing`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(ENDPOINT).loginAs(user).json({})
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "contactId",
                    "message": "required validation failed",
                },
            ],
        })
    })

    test(`it should FAIL (400) when contact is not found`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(ENDPOINT).loginAs(user).json({
            contactId: '4c02e053-d592-47db-8023-ac590acd8000'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test(`it should FAIL (422) when contactId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(ENDPOINT).loginAs(user).json({
            contactId: 'anInvalidUuid'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "uuid",
                    "field": "contactId",
                    "message": "uuid validation failed",
                },
            ],
        }
        )
    })

    test(`it should create contact (201)`, async ({ client, assert }) => {
        const botA = await User.findByOrFail('email', bot.email)
        const botB = await User.findByOrFail('email', bot2.email)
        const response = await client.post(ENDPOINT).loginAs(botB).json({
            contactId: botA.id
        })
        response.assertAgainstApiSpec()
        response.assertStatus(201)

        await botB.load('contacts')
        console.log(botB.contacts.map(c => c.contact))
        assert.exists(botB.contacts[0])
        assert.equal(botB.contacts[0].contactId, botA.id)

    })
})
