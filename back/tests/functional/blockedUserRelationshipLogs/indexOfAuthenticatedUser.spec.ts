import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/blocked-user-relationship-logs/index-of-authenticated-user'


test.group('BlockedUserRelationshipLogs indexOfAuthenticatedUser', () => {

    TestHelper.notAuthenticated('get', ENDPOINT)

    test(`should return list of blocked user relationship logs of authenticated user`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(ENDPOINT).loginAs(user)

        ResponseAssertHelper.minimalAssert(response, 200)

        await user.load('blockedUserRelationshipLogs', (q) => q.preload('relatedUser'))
        response.assertBodyContains(user.blockedUserRelationshipLogs.map(blockedUserRelationshipLog => blockedUserRelationshipLog.serialize()))
    })
})
