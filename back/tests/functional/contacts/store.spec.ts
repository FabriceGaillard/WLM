import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT_PREFIX = 'api/users'
const ENDPOINT_SUFIX = 'user-relationships'

test.group('UserRelationships store', () => {
    test(`it should FAIL (401) when user is not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`)
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

    test(`it should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const contactId = user.userRelationships[0].relatedUserId
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user2).json({
            contactId: contactId
        })
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test(`it should FAIL (400) when row exist`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const contactId = user.userRelationships[0].relatedUserId
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user).json({
            contactId: contactId
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test(`it should FAIL(422) when contactId is missing`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user).json({})
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

    test(`it should FAIL(422) when userId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/anInvalidUuid/${ENDPOINT_SUFIX}`).loginAs(user).json({
            contactId: "373fa2b6-8a06-4538-83cc-9f56cf212782"
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "uuid",
                    "field": "params.userId",
                    "message": "uuid validation failed",
                }
            ],
        })
    })

    test(`it should FAIL (404) when UserRelationship is not found`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user).json({
            contactId: '4c02e053-d592-47db-8023-ac590acd8000'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(404)
        response.assertBody({})
    })

    test(`it should FAIL(422) when contactId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user).json({
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

    test(`it should create UserRelationship(201)`, async ({ client, assert }) => {
        const botA = await User.findByOrFail('email', bot.email)
        const botB = await User.findByOrFail('email', bot2.email)
        const response = await client.post(`${ENDPOINT_PREFIX}/${botB.id}/${ENDPOINT_SUFIX}`).loginAs(botB).json({
            contactId: botA.id
        })
        response.assertAgainstApiSpec()
        response.assertStatus(201)

        await botB.load('userRelationships')
        assert.exists(botB.userRelationships[0])
        assert.equal(botB.userRelationships[0].relatedUserId, botA.id)

    })
})
