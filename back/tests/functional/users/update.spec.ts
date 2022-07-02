import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import InvalidAlternateEmailException from 'App/Exceptions/User/InvalidAlternateEmailException'
import ResponseAssertHelper from 'App/Helpers/Tests/ResponseAssertHelper'
import RulesHelper from 'App/Helpers/Tests/RulesHelper'
import TestHelper from 'App/Helpers/Tests/TestHelper'
import User from 'App/Models/User'
import { bot, bot2 } from 'Database/seeders/01-UserSeeder'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

const ENDPOINT = 'api/users'

test.group('Users update', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    TestHelper.notAuthenticated('put', `${ENDPOINT}/fakeUuid`)
    TestHelper.ressourceIdInvalid('user', 'put', `${ENDPOINT}/fakeUuid`)
    TestHelper.ressourceNotFound('user', 'put', `${ENDPOINT}/${uuidv4()}`)

    test(`should FAIL (403) when user is not the owner`, async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).loginAs(user2)
        ResponseAssertHelper.error403(response)
    })

    test('should FAIL (400) when alternateEmail is identical of email', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            alternateEmail: user.email
        }).loginAs(user)
        ResponseAssertHelper.error400(response, {
            "errors": [{
                "message": new InvalidAlternateEmailException().message
            }]
        })

    })

    test('should FAIL (422) when id is invalid', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/anInvalidUuid`).json({}).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.uuid('params.id')])
    })

    test('should FAIL (422) when username is over 255 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            username: 'a'.repeat(256)
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('username', 255)])
    })

    test('should FAIL (422) when avatar is not a file', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            avatar: 'anInvalidFile'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.file('avatar', {
            "size": "2mb",
            "extnames": [
                "jpg",
                "jpeg",
                "gif",
                "png",
                "webp",
            ],
        })])
    })

    /*     test('should FAIL (422) when avatar file has not a good extension', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.put(`${ENDPOINT}/${user.id}`).json({
                avatar: 'anInvalidFile'
            }).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(422)
            response.assertBody({})
        })
    
        test('should FAIL (422) when avatar file is over 2mb', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.put(`${ENDPOINT}/${user.id}`).json({
                avatar: 'anInvalidFile'
            }).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(422)
            response.assertBody({})
        }) */

    test('should FAIL (422) when firstName did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            firstName: '02Fabrice'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.regex('firstName')])
    })

    test('should FAIL (422) when firstName is over 255 character', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            firstName: 'a'.repeat(256)
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('firstName', 255)])
    })

    test('should FAIL (422) when lastName did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            lastName: '02G'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.regex('lastName')])
    })

    test('should FAIL (422) when lastName is over 255 character', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            lastName: 'a'.repeat(256)
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('lastName', 255)])
    })

    test('should FAIL (422) when gender is not in range of specified value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            gender: 'anInvalidGender'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.enum('gender', [
            "male",
            "female",
            "unbinary",
        ])])
    })

    test('should FAIL (422) when status is not in range of specified value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            status: 'anInvalidStatus'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.enum('status', [
            "online",
            "busy",
            "beRightBack",
            "away",
            "onThePhone",
            "outToLunch",
            "appearOffline",
        ])])
    })

    test('should FAIL (422) when birthyear is not between before 130 year and today', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            birthYear: 1800
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.range('birthYear', {
            "start": DateTime.now().year - 130,
            "stop": DateTime.now().year,
        })])
    })

    test('should FAIL (422) when birthyear is not a digital value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            birthYear: 'stringValue'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.number('birthYear')])
    })

    test('should FAIL (422) when personalMessage is over 255', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            personalMessage: 'a'.repeat(256)
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('personalMessage', 255)])
    })

    test('should FAIL (422) when state did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            state: '678invalidState'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.regex('state')])
    })

    test('should FAIL (422) when state is over 255 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            state: 'a'.repeat(256)
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.maxLength('state', 255)])
    })

    test('should FAIL (422) when zipCode did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            zipCode: '2C678'
        }).loginAs(user)
        ResponseAssertHelper.error422(response, [RulesHelper.regex('zipCode', "zipCode must be equal to five numerics characters")])
    })

})
