import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import Group from 'App/Models/Group'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/groups'

test.group('Groups update', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('put', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('group', 'put', `${ENDPOINT}/anInvalidUuid`)
    TestHelper.ressourceNotFound('group', 'put', `${ENDPOINT}/${uuidv4()}`)


    test('should FAIL (422) when name is over 255 characters', async ({ client }) => {
        const user = await User.firstOrFail()
        await user.load('groups')
        const response = await client.put(`${ENDPOINT}/${user.groups[0].id}`).json({
            name: 'tooLong'.repeat(100),
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('name', 255)])
    })

    test('should update a group and return it', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('groups')
        const name = 'aNewNameGroup1234'
        const response = await client.put(`${ENDPOINT}/${user.groups[0].id}`).loginAs(user).json({ name })
        ResponseAssertHelper.minimalAssert(response, 200)
        const newGroup = await Group.findByOrFail('name', name)
        response.assertBody(newGroup.serialize())
    })

})
