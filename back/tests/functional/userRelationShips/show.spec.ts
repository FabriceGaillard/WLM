import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/user-relationships'

test.group('UserRelationships show', () => {
    TestHelper.notAuthenticated('get', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('userRelationships', 'get', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceNotFound('userRelationships', 'get', `${ENDPOINT}/${uuidv4()}`)


    test(`should FAIL (403) when user is not owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')

        const user2 = await User.findByOrFail('email', bot2.email)

        const response = await client.get(`${ENDPOINT}/${user.userRelationships[0].id}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test(`should return UserRelationship`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships', (q) => q.preload('relatedUser'))

        const response = await client.get(`${ENDPOINT}/${user.userRelationships[0].id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)
        response.assertBodyContains(user.userRelationships[0].serialize())
    })
})
