import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT_PREFIX = 'api/users'
const ENDPOINT_SUFIX = 'user-relationships'

test.group('UserRelationships show', () => {
    test(`it should FAIL (401) when user is not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}/${user.userRelationships[0].relatedUserId}`)
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

    test(`it should FAIL (422) when contactId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}/anInvalidUuid`).loginAs(user)
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

    test(`it should FAIL (422) when userId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const response = await client.get(`${ENDPOINT_PREFIX}/anInvalidUuid/${ENDPOINT_SUFIX}/${user.id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "uuid",
                    "field": "params.userId",
                    "message": "uuid validation failed",
                },
            ],
        })
    })

    test(`it should FAIL (404) when UserRelationship is not found`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}/373fa2b6-8a06-4538-83cc-9f56cf212782`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(404)
        response.assertBody({})
    })

    test(`it should FAIL (403) when user is not owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}/${user.userRelationships[0].relatedUserId}`).loginAs(user2)
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test(`it should return UserRelationship`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships', (q) => q.preload('relatedUser'))
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}/${user.userRelationships[0].relatedUserId}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)
        response.assertBodyContains(user.userRelationships[0].serialize())
    })
})
