import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'

const ENDPOINT = 'api/groups'


test.group('Groups destroy', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('get', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('group', 'get', `${ENDPOINT}/anInvalidUuid`)
    TestHelper.ressourceNotFound('group', 'get', `${ENDPOINT}/${uuidv4()}`)

    test(`should FAIL (403) when user is not the owner of group`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.get(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test('should get group', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const response = await client.get(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user)
        ResponseAssertHelper.minimalAssert(response, 200)
        response.assertBody(user.groups[0].serialize())
    })

})
