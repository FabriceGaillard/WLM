import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT_PREFIX = 'api/users'
const ENDPOINT_SUFIX = 'user-relationships'


test.group('UserRelationships index', () => {
    test(`it should FAIL (401) when user is not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`)
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
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user2)
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test(`it should FAIL (422) when userId is invalid`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/anInvalidUuid/${ENDPOINT_SUFIX}`).loginAs(user)
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

    test(`it should return list of contacts`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(`${ENDPOINT_PREFIX}/${user.id}/${ENDPOINT_SUFIX}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)

        await user.load('userRelationships', (q) => q.preload('relatedUser'))
        response.assertBodyContains(user.userRelationships.map(userRelationship => userRelationship.serialize()))
    })
})
