import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import InvalidCredentialException from 'App/Exceptions/Auth/InvalidCredentialException'
import InvalidSignedUrlException from 'App/Exceptions/Auth/InvalidSignedUrlException'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'

const ENDPOINT = 'api/auth/verify'
const params = 'fabou291@gmail.com?signature=eyJtZXNzYWdlIjoiL2FwaS9hdXRoL3ZlcmlmeS9mYWJvdTI5MUBnbWFpbC5jb20ifQ.IsJzBnr9LwWyNyhP1F0S9nE1sEF_Hcj795x1edfRgdU'

test.group('Auth confirmAccount', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (422) when email is invalid', async ({ client }) => {
        const response = await client.get(`${ENDPOINT}/fabou291@@gmail.com`)
        ResponseAssertHelper.error422(response, [RulesHelper.email('params.email')])
    })

    test('it should FAIL (400) when user is not found', async ({ client }) => {
        const response = await client.get(`${ENDPOINT}/${params}`)
        ResponseAssertHelper.error400(response, { errors: [{ message: new InvalidCredentialException().message }] })
    })

    test('it should FAIL (400) when signedUrl is incorrect', async ({ client }) => {
        const response = await client.get(`${ENDPOINT}/bot@example.com?signedUrl=anInvalidSignature`)
        ResponseAssertHelper.error400(response, { errors: [{ message: new InvalidSignedUrlException().message }] })
    })

    test('it should succeed (204)', async ({ client }) => {
        await User.create({ ...bot, email: 'fabou291@gmail.com' })
        const response = await client.get(`${ENDPOINT}/${params}`)
        ResponseAssertHelper.noContent(response)
    })

})
