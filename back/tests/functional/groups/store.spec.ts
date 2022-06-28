import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import Group from 'App/Models/Group'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'


const ENDPOINT = 'api/groups'

test.group('Groups store', (group) => {
    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('post', ENDPOINT)


    test('it should FAIL (422) when name is over 255 characters', async ({ client }) => {
        const user = await User.firstOrFail()
        const response = await client.post(ENDPOINT).json({
            name: 'tooLong'.repeat(100),
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [RulesHelper.maxLength('name', 255)]
        })
    })

    test('it should FAIL (422) when name is missing', async ({ client }) => {
        const user = await User.firstOrFail()
        const response = await client.post(ENDPOINT).json({}).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [RulesHelper.required('name')]
        })
    })

    test('it should create a new group and return it', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const name = 'aNewGroup'
        const response = await client.post(ENDPOINT).loginAs(user).json({ name })
        response.assertAgainstApiSpec()
        response.assertStatus(201)
        const newGroup = await Group.findByOrFail('name', name)
        response.assertBody(newGroup.serialize())
    })

})
