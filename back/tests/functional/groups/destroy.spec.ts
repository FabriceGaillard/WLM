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

    TestHelper.notAuthenticated('delete', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('group', 'delete', `${ENDPOINT}/anInvalidUuid`)
    TestHelper.ressourceNotFound('group', 'delete', `${ENDPOINT}/${uuidv4()}`)

    test(`should FAIL (403) when user is not the owner of group`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.delete(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test('should delete group', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const response = await client.delete(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user)
        ResponseAssertHelper.noContent(response)

    })

})
