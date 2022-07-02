import { test } from '@japa/runner'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/user-relationships/index-of-authenticated-user'


test.group('UserRelationships indexOfAuthenticatedUser', () => {

    TestHelper.notAuthenticated('get', ENDPOINT)

    test(`it should return list of relationships of authenticated user`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.get(ENDPOINT).loginAs(user)

        response.assertAgainstApiSpec()
        response.assertStatus(200)

        await user.load('userRelationships', (q) => q.preload('relatedUser'))
        response.assertBodyContains(user.userRelationships.map(userRelationship => userRelationship.serialize()))
    })
})
