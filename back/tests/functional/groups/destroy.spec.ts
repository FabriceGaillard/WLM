import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'
import TestHelper from 'App/Helpers/Tests/TestHelper'

const ENDPOINT = 'api/groups'


test.group('Groups destroy', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('delete', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('group', 'delete', `${ENDPOINT}/anInvalidUuid`)
    TestHelper.ressourceNotFound('group', 'delete', `${ENDPOINT}/${uuidv4()}`)

    test(`it should FAIL (403) when user is not the owner of group`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.delete(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user2)
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test('it should delete group', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const response = await client.delete(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(204)
        response.assertBody({})
    })

})
