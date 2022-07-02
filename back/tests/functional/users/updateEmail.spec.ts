import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import EmailSendingFail from 'App/Exceptions/Auth/EmailSendingFail'
import InvalidAlternateEmailException from 'App/Exceptions/User/InvalidAlternateEmailException'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/users'
const ENDPOINT_SUFFIX = 'update-email'

test.group('Users updateEmail', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`)
    TestHelper.ressourceIdInvalid('user', 'patch', `${ENDPOINT}/aFakeUuid/${ENDPOINT_SUFFIX}`, {
        oldEmail: 'valid@email.com',
        newEmail: 'valid2@email.com'
    })
    TestHelper.ressourceNotFound('user', 'patch', `${ENDPOINT}/${uuidv4()}/${ENDPOINT_SUFFIX}`, {
        oldEmail: 'valid@email.com',
        newEmail: 'valid2@email.com'
    })



    test(`should FAIL (400) when account is not verified`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.merge({ verifiedAt: null }).save()

        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com'
        })
        ResponseAssertHelper.error400(response, {
            "errors": [
                {
                    "message": "E_INVALID_ACCOUNT: Invalid account.",
                },
            ],
        })
    })

    test('should FAIL (400) when email sending fails', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmai.com',
        })
        ResponseAssertHelper.error400(response, {
            errors: [{
                message: new EmailSendingFail().message
            }]
        })

    })

    test(`should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user2).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
        })
        ResponseAssertHelper.error403(response)
    })

    test('should FAIL (422) when user id is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/anInvalidUuid/${ENDPOINT_SUFFIX}`).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.uuid('params.id')])
    })

    test('should FAIL (422) when newEmail is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'anInvalidPassword',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.email('newEmail')])
    })

    test('should FAIL (422) when newEmail is not unique', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'bot2@example.com',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.unique('newEmail', "unique validation failure")])
    })

    test('should FAIL (422) when newEmail is missing', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: undefined
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.required('newEmail')])
    })

    test('should FAIL (422) when newEmail is identic of previous ', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'bot@example.com',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [
            RulesHelper.different('newEmail'),
            RulesHelper.unique('newEmail', "unique validation failure"),
        ])
    })

    test('should FAIL (400) when newEmail and alternateEmail are identic', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: bot.email,
            newEmail: bot.alternateEmail,
        }).loginAs(user)
        ResponseAssertHelper.error400(response, {
            errors: [
                {
                    message: new InvalidAlternateEmailException().message
                }
            ]
        })
    })

    test('should FAIL (422) when oldEmail is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 123,
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.string('oldEmail')])
    })

    test('should FAIL (400) when oldEmail is not the actual email', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'notActualEmail@example.com',
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        ResponseAssertHelper.error400(response)
    })

    test('should SUCCEED (204)', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        ResponseAssertHelper.noContent(response)
    })
})