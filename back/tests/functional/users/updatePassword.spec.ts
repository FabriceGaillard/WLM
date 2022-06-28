import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/users'
const ENDPOINT_SUFFIX = 'update-password'

test.group('Users updatePassword', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test(`it should FAIL (401) when user is not authenticated`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`)
        response.assertAgainstApiSpec()
        response.assertStatus(401)
        response.assertBody({
            "errors": [
                {
                    "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access",
                },
            ],
        })
    })

    test(`it should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user2).json({
            oldPassword: bot.password,
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(403)
        response.assertBody({
            "message": "E_AUTHORIZATION_FAILURE: Not authorized to perform this action",
        })
    })

    test('it should FAIL (422) when user id is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/anInvalidUuid/${ENDPOINT_SUFFIX}`).json({
            oldPassword: bot.password,
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "uuid",
                    "field": "params.id",
                    "message": "uuid validation failed",
                },
            ],
        })
    })

    test('it should FAIL (422) when newPassword is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'anInvalidPassword',
            passwordConfirmation: 'anInvalidPassword',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "regex",
                    "field": "newPassword",
                    "message": "regex validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when newPassword is over 180 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'anInvalidPasswordOver180Character+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
            passwordConfirmation: 'anInvalidPasswordOver180Character+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "maxLength",
                "field": "newPassword",
                "message": "maxLength validation failed",
                "args": {
                    "maxLength": 180
                }
            }]
        })
    })

    test('it should FAIL (422) when newPassword is missing', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: undefined
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "newPassword",
                    "message": "required validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when passwordConfirmation is different of newPassword', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'anInvalidPassword'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "confirmed",
                "field": "passwordConfirmation",
                "message": "confirmed validation failed"
            }]
        })
    })

    test('it should FAIL (422) when newPassword is identic of previous ', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'TESTtest1234.',
            newPassword: 'TESTtest1234.',
            passwordConfirmation: 'TESTtest1234.',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "different",
                "field": "newPassword",
                "message": "different validation failed",
            }]
        })
    })

    test('it should FAIL (422) when oldPassword is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 123,
            newPassword: 'Testtest1234.2',
            passwordConfirmation: 'Testtest1234.2',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "string",
                    "field": "oldPassword",
                    "message": "string validation failed",
                },
            ]
        })
    })

    test('it should FAIL (400) when oldPassword is not the actual password', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: 'notActualPassword',
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": new InvalidCredentialException().message
                },
            ]
        })
    })

    test('it should SUCCEED (204)', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldPassword: bot.password,
            newPassword: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(204)
        response.assertBody({})
    })
})



