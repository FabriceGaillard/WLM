import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'
import Route from '@ioc:Adonis/Core/Route'
import InvalidSignedUrlException from 'App/Exceptions/Auth/InvalidSignedUrlException'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'

const ENDPOINT = 'api/auth/reset-password'

test.group('Auth resetPassword', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (400) when signature is invalid', async ({ client }) => {
        const response = await client.patch(`${ENDPOINT}/${bot.email}?signature=anInvalidSignature`).json({
            password: bot.password,
            passwordConfirmation: bot.password
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": new InvalidSignedUrlException().message,
                },
            ],
        })
    })

    test('it should FAIL (422) when email is invalid', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'fabou291@@gmail.com' })
        const response = await client.patch(signedUrl).json({
            password: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2',
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "email",
                    "field": "params.email",
                    "message": "email validation failed",
                },
            ],
        })
    })

    test('it should FAIL (422) when password is invalid', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'fabou291@gmail.com' })
        const response = await client.patch(signedUrl).json({
            password: 'anInvalidPassword',
            passwordConfirmation: 'anInvalidPassword',
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "regex",
                    "field": "password",
                    "message": "password must contain 12 character minimum with at least:\nOne minuscule\nOne majuscule\nOne numeric\nOne special character",
                },
            ],
        })
    })

    test('it should FAIL (422) when password is missing', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'fabou291@gmail.com' })
        const response = await client.patch(signedUrl).json({
            passwordConfirmation: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "required",
                    "field": "password",
                    "message": "required validation failed",
                },
            ],
        })
    })

    test('it should FAIL (422) when passwordConfirmation is invalid', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'fabou291@gmail.com' })
        const response = await client.patch(signedUrl).json({
            password: bot.password,
            passwordConfirmation: 'notIdenticalPassword',
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "confirmed",
                    "field": "passwordConfirmation",
                    "message": "confirmed validation failed"
                },
            ],
        })
    })

    test('it should FAIL (422) when passwordConfirmation is missing', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'fabou291@gmail.com' })
        const response = await client.patch(signedUrl).json({
            password: bot.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "confirmed",
                    "field": "passwordConfirmation",
                    "message": "confirmed validation failed",
                },
            ],
        })
    })

    test('it should FAIL (400) when user is not found', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: 'unknowUser@gmail.com' })

        const response = await client.patch(signedUrl).json({
            password: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [
                {
                    "message": new InvalidCredentialException().message
                },
            ],
        })
    })

    test('it should FAIL (400) when email sending fails', async ({ client }) => {
        const signedUrl = Route.makeSignedUrl('resetPassword', { email: bot.email })

        const response = await client.patch(signedUrl).json({
            password: 'TESTtest1234.2',
            passwordConfirmation: 'TESTtest1234.2'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({})
    })

    test('it should FAIL (400) when password is identic of previous ', async ({ client }) => {
        const email = 'fabou291@gmail.com'
        const signedUrl = Route.makeSignedUrl('resetPassword', { email })

        const user = await User.create({ ...bot, email })
        const response = await client.patch(signedUrl).json({
            password: user.password,
            passwordConfirmation: user.password,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(204)
    })

    test('it should reset password', async ({ client, assert }) => {
        const email = 'fabou291@gmail.com'
        const signedUrl = Route.makeSignedUrl('resetPassword', { email })

        let user = await User.create({ ...bot, email })
        const oldPassword = user.password
        const newPassword = 'TESTtest1234.2'

        const response = await client.patch(signedUrl).json({
            password: newPassword,
            passwordConfirmation: newPassword,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(204)

        user = await User.findBy('email', email) as User
        assert.notEqual(oldPassword, newPassword)
    })
})
