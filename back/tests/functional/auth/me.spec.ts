import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'

const ENDPOINT = 'api/auth/me'

test.group('Auth me', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('get', ENDPOINT)

    test(`should success (200), and return user`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)

        const response = await client.get(ENDPOINT).loginAs(user)
        ResponseAssertHelper.minimalAssert(response, 200)
        response.assertBody({
            ...user.serialize()
        })
    })


})
