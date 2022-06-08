import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { bot } from 'Database/seeders/UserSeeder'
import { DateTime } from 'luxon'
const ENDPOINT = 'api/users'

test.group('Users update', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    test('it should FAIL (400) when alternateEmail is identical of email', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            alternateEmail: user.email
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(400)
        response.assertBody({
            "errors": [{
                "message": "E_INVALID_ALTERNATE_EMAIL: alternameEmail cannot be identical of email."
            }]
        })
    })

    test('it should FAIL (422) when username is over 255 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            username: 'aUsernameOver255Characterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "maxLength",
                    "field": "username",
                    "message": "maxLength validation failed",
                    "args": {
                        "maxLength": 255,
                    },
                },
            ],
        })
    })

    test('it should FAIL (422) when avatar is not a file', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            avatar: 'anInvalidFile'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "file",
                    "field": "avatar",
                    "message": "file validation failed",
                    "args": {
                        "size": "2mb",
                        "extnames": [
                            "jpg",
                            "jpeg",
                            "gif",
                            "png",
                            "webp",
                        ],
                    },
                },
            ],
        })
    })

    /*     test('it should FAIL (422) when avatar file has not a good extension', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.put(`${ENDPOINT}/${user.id}`).json({
                avatar: 'anInvalidFile'
            }).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(422)
            response.assertBody({})
        })
    
        test('it should FAIL (422) when avatar file is over 2mb', async ({ client }) => {
            const user = await User.findByOrFail('email', bot.email)
            const response = await client.put(`${ENDPOINT}/${user.id}`).json({
                avatar: 'anInvalidFile'
            }).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(422)
            response.assertBody({})
        }) */

    test('it should FAIL (422) when firstName did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            firstName: '02Fabrice'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "regex",
                "field": "firstName",
                "message": "regex validation failed"
            }]
        })
    })

    test('it should FAIL (422) when firstName is over 255 character', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            firstName: 'anInvalidFirstNameOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "maxLength",
                "field": "firstName",
                "message": "maxLength validation failed",
                "args": {
                    "maxLength": 255
                }
            }]
        })
    })

    test('it should FAIL (422) when lastName did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            lastName: '02G'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "regex",
                "field": "lastName",
                "message": "regex validation failed",
            }]
        })
    })

    test('it should FAIL (422) when lastName is over 255 character', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            lastName: 'anInvalidLastNameOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "maxLength",
                "field": "lastName",
                "message": "maxLength validation failed",
                "args": {
                    "maxLength": 255
                }
            }]
        })
    })

    test('it should FAIL (422) when gender is not in range of specified value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            gender: 'anInvalidGender'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "enum",
                "field": "gender",
                "message": "enum validation failed",
                "args": {
                    "choices": [
                        "male",
                        "female",
                        "unbinary",
                    ],
                },
            }]
        })
    })

    test('it should FAIL (422) when status is not in range of specified value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            status: 'anInvalidStatus'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "enum",
                "field": "status",
                "message": "enum validation failed",
                "args": {
                    "choices": [
                        "online",
                        "busy",
                        "beRightBack",
                        "away",
                        "onThePhone",
                        "outToLunch",
                        "appearOffline",
                    ],
                },
            }]
        })
    })

    test('it should FAIL (422) when birthyear is not between before 130 year and today', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            birthYear: 1800
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "range",
                "field": "birthYear",
                "message": "range validation failed",
                "args": {
                    "start": DateTime.now().year - 130,
                    "stop": DateTime.now().year,
                }
            }]
        })
    })

    test('it should FAIL (422) when birthyear is not a digital value', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            birthYear: 'stringValue'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "number",
                "field": "birthYear",
                "message": "number validation failed",
            }]
        })
    })

    test('it should FAIL (422) when personalMessage is over 255', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            personalMessage: 'personalMessageOver255Characterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "maxLength",
                    "field": "personalMessage",
                    "message": "maxLength validation failed",
                    "args": {
                        "maxLength": 255,
                    },
                },
            ],
        })
    })

    test('it should FAIL (422) when state did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            state: '678invalidState'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "regex",
                "field": "state",
                "message": "regex validation failed",
            }]
        })
    })

    test('it should FAIL (422) when state is over 255 characters', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            state: 'invalidStateOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "maxLength",
                "field": "state",
                "message": "maxLength validation failed",
                "args": {
                    "maxLength": 255,
                }
            }]
        })
    })

    test('it should FAIL (422) when zipCode did not respect regex format', async ({ client }) => {
        const user = await User.findByOrFail('email', bot.email)
        const response = await client.put(`${ENDPOINT}/${user.id}`).json({
            zipCode: '2C678'
        }).loginAs(user)
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "regex",
                "field": "zipCode",
                "message": "zipCode must be equal to five numerics characters",
            }]
        })
    })

})
