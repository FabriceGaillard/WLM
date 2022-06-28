import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import EmailSendingFail from 'App/Exceptions/Auth/EmailSendingFail'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
const ENDPOINT = 'api/users'
const ENDPOINT_SUFFIX = 'update-email'

test.group('Users updateEmail', (group) => {

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

    test(`it should FAIL (400) when account is not verified`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        await user.merge({ verifiedAt: null }).save()

        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": "E_INVALID_ACCOUNT: Invalid account.",
                },
            ],
        })
    })

    test('it should FAIL (400) when email sending fails', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmai.com',
        })

        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            errors: [{
                message: new EmailSendingFail().message
            }]
        })
    })

    test(`it should FAIL (404) when user is not found`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/2b9c5406-ec99-4297-ac4d-9243d1487f90/${ENDPOINT_SUFFIX}`).loginAs(user).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
        })
        response.assertAgainstApiSpec()
        response.assertStatus(404)
        response.assertBody({})
    })

    test(`it should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).loginAs(user2).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
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
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
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

    test('it should FAIL (422) when newEmail is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'anInvalidPassword',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "email",
                    "field": "newEmail",
                    "message": "email validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when newEmail is not unique', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'bot2@example.com',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "unique",
                    "field": "newEmail",
                    "message": "unique validation failure"
                },
            ]
        })
    })

    test('it should FAIL (422) when newEmail is missing', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: undefined
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "newEmail",
                    "message": "required validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when newEmail is identic of previous ', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'bot@example.com',
            newEmail: 'bot@example.com',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "different",
                "field": "newEmail",
                "message": "different validation failed",
            },
            {
                "rule": "unique",
                "field": "newEmail",
                "message": "unique validation failure",
            }]
        })
    })

    test('it should FAIL (400) when newEmail and alternateEmail are identic', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: bot.email,
            newEmail: bot.alternateEmail,
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [{
                "message": "E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email."
            }]
        })
    })

    test('it should FAIL (422) when oldEmail is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 123,
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "string",
                    "field": "oldEmail",
                    "message": "string validation failed",
                },
            ]
        })
    })

    test('it should FAIL (400) when oldEmail is not the actual email', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: 'notActualEmail@example.com',
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test('it should SUCCEED (204)', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.patch(`${ENDPOINT}/${user.id}/${ENDPOINT_SUFFIX}`).json({
            oldEmail: bot.email,
            newEmail: 'fabou291@gmail.com',
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(204)
        response.assertBody({})
    })
})



