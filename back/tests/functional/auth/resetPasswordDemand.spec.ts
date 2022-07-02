import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/01-UserSeeder'

const ENDPOINT = 'api/auth/reset-password-demand'

test.group('Auth resetPasswordDemand', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('should FAIL (422) when email is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: 'anInvalidEmail@@gmail.com',
        })
        ResponseAssertHelper.error422(response, [RulesHelper.email('email')])
    })

    test('should FAIL (400) when user is not found', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        ResponseAssertHelper.error400(response)
    })

    test('should FAIL (400) when email sending fails', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            email: bot.email,
        })
        ResponseAssertHelper.error400(response)
    })

    test('should succeed (204)', async ({ client }) => {
        await User.create({ ...bot, email: 'fabou291@gmail.com' })
        const response = await client.post(ENDPOINT).json({
            email: 'fabou291@gmail.com'
        })
        ResponseAssertHelper.noContent(response)

    })

})
