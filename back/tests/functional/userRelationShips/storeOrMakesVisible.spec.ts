import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/user-relationships/store-or-makes-visible'

test.group('UserRelationships store', () => {
    TestHelper.notAuthenticated('post', ENDPOINT);

    test(`should FAIL(422) when relatedUserEmail is missing`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(ENDPOINT).loginAs(user).json({})
        ResponseAssertHelper.error422(response, [RulesHelper.required('relatedUserEmail')])
    })

    test(`should FAIL (422) when relatedUserEmail is an invalid email`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.post(ENDPOINT).loginAs(user).json({
            relatedUserEmail: 'invalid@@email.com'
        })
        ResponseAssertHelper.error422(response, [RulesHelper.email('relatedUserEmail')])
    })


    test(`should create UserRelationship(200)`, async ({ client }) => {
        const botA = await User.findByOrFail('email', bot.email)
        const botB = await User.findByOrFail('email', bot2.email)
        const response = await client.post(ENDPOINT).loginAs(botB).json({
            relatedUserEmail: botA.email
        })

        ResponseAssertHelper.minimalAssert(response, 200)
        await botB.load('userRelationships', (q) => q.preload('relatedUser'))

        response.assertBody(botB.userRelationships[0].serialize({
            fields: {
                omit: ['groupId'],
            }
        }))
    })
})
