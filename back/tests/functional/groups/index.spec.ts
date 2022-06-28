import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/groups'

test.group('Groups index', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('get', ENDPOINT)

    test('it should return all group', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const response = await client.get(ENDPOINT).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(200)
        response.assertBody(user.groups.map(group => group.serialize()))
    })

})
