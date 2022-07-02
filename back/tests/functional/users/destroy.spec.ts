import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/users'


test.group('Users destroy', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('delete', `${ENDPOINT}/fakeUuid`)
    TestHelper.ressourceIdInvalid('user', 'delete', `${ENDPOINT}/fakeUuid`)
    TestHelper.ressourceNotFound('user', 'delete', `${ENDPOINT}/${uuidv4()}`)

    test(`should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.delete(`${ENDPOINT}/${user.id}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test('should FAIL (422) when id is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/anInvalidUuid`).json({}).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.uuid('params.id')])
    })

    test('should delete user', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.delete(`${ENDPOINT}/${user.id}`).loginAs(user)
        ResponseAssertHelper.noContent(response)
    })

    /*     test('should delete avatar when he is store into temp/uploads/avatar', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.delete(`${ENDPOINT}/${user.id}`).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(204)
            response.assertBody({})
        }) */
})
