import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/users'
const ENDPOINT_SUFFIX = 'update-password'

test.group('Users updatePassword', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`)
    TestHelper.ressourceIdInvalid('user', 'patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`, {
        oldPassword: 'TESTtest1234.',
        newPassword: 'TESTtest1234.2',
        passwordConfirmation: 'TESTtest1234.2'
    })
    TestHelper.ressourceNotFound('user', 'patch', `${ENDPOINT}/${uuidv4()}/${ENDPOINT_SUFFIX}`, {
        oldPassword: 'TESTtest1234.',
        newPassword: 'TESTtest1234.2',
        passwordConfirmation: 'TESTtest1234.2'
    })

    test(`should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user2).json({
            oldPassword: bot.password,
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2'
        })
        ResponseAssertHelper.error403(response)
    })

    test('should FAIL (422) when newPassword is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'anInvalidPassword',
            passwordConfirmation: 'anInvalidPassword',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.regex('newPassword')])
    })

    test('should FAIL (422) when newPassword is over 180 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'aA1+'.repeat(100),
            passwordConfirmation: 'aA1+'.repeat(100),
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('newPassword', 180)])
    })

    test('should FAIL (422) when newPassword is missing', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: undefined
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.required('newPassword')])
    })

    test('should FAIL (422) when passwordConfirmation is different of newPassword', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'anInvalidPassword'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.confirmed('passwordConfirmation')])
    })

    test('should FAIL (422) when newPassword is identic of previous ', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'TESTtest1234.',
            passwordConfirmation: 'TESTtest1234.',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.different('newPassword')])
    })

    test('should FAIL (422) when oldPassword is not a string', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 123,
            newPassword: 'Testtest1234.2',
            passwordConfirmation: 'Testtest1234.2',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.string('oldPassword')])
    })

    test('should FAIL (400) when oldPassword is not the actual password', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'notActualPassword',
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2',
        }).loginAs(user)
        ResponseAssertHelper.error400(response, {
            "errors": [
                {
                    "message": new InvalidCredentialException().message
                },
            ]
        })
    })

    test('should SUCCEED (204)', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: bot.password,
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2',
        }).loginAs(user)
        ResponseAssertHelper.noContent(response)
    })
})



