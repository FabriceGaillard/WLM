import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/user-relationships'
const ENDPOINT_SUFFIX = 'block'

test.group('UserRelationships show', () => {
    TestHelper.notAuthenticated('patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`)
    TestHelper.ressourceIdInvalid('userRelationships', 'patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`)
    TestHelper.ressourceNotFound('userRelationships', 'patch', `${ENDPOINT}/${uuidv4()}/${ENDPOINT_SUFFIX}`)


    test(`should FAIL (403) when user is not owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')

        const user2 = await User.findByOrFail('email', bot2.email)

        const response = await client.patch(`${ENDPOINT}/${user.userRelationships[0].id}/${ENDPOINT_SUFFIX}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test(`should FAIL (400) when userRelationship is already blocked`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        await user.userRelationships[0].merge({ isBlocked: true }).save()

        const response = await client.patch(`${ENDPOINT}/${user.userRelationships[0].id}/${ENDPOINT_SUFFIX}`).loginAs(user)
        ResponseAssertHelper.error400(response)
    })

    test(`should block UserRelationship`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.load('userRelationships')
        await user.userRelationships[0].merge({ isBlocked: false }).save()

        const response = await client.patch(`${ENDPOINT}/${user.userRelationships[0].id}/${ENDPOINT_SUFFIX}`).loginAs(user)
        ResponseAssertHelper.noContent(response)
    })
})
