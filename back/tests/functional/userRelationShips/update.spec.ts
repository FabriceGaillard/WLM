import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/user-relationships'

test.group('UserRelationships update', () => {
    TestHelper.notAuthenticated('put', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceIdInvalid('userRelationships', 'put', `${ENDPOINT}/aFakeUuid`)
    TestHelper.ressourceNotFound('userRelationships', 'put', `${ENDPOINT}/${uuidv4()}`)


    test(`should FAIL (403) when user is not owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')

        const user2 = await User.findByOrFail('email', bot2.email)

        const response = await client.put(`${ENDPOINT}/${user.userRelationships[0].id}`)
            .loginAs(user2)
            .json({})
        ResponseAssertHelper.error403(response)

    })

    test(`should FAIL (422) when isHidden property is not a boolean`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')

        const user2 = await User.findByOrFail('email', bot2.email)

        const response = await client.put(`${ENDPOINT}/${user.userRelationships[0].id}`)
            .loginAs(user2)
            .json({
                isHidden: 'notABooleanValue'
            })
        ResponseAssertHelper.error422(response, [RulesHelper.boolean('isHidden')])
    })

    test(`should return UserRelationship`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships', (q) => q.preload('relatedUser'))

        const response = await client.put(`${ENDPOINT}/${user.userRelationships[0].id}`).loginAs(user)
            .json({
                isHidden: true
            })
        ResponseAssertHelper.minimalAssert(response, 200)

        await user.load('userRelationships', (q) => q.preload('relatedUser'))
        response.assertBody(user.userRelationships[0].serialize())
    })
})
