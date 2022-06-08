import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

const ENDPOINT = 'api/auth/register'
const validEmail = "fabou291@gmail.com"
const validBody = {
    "email": validEmail,
    "password": "TESTtest1234.",
    "passwordConfirmation": "TESTtest1234.",
    "firstName": "Fab",
    "lastName": "G",
    "gender": "male",
    "birthYear": "2022",
    "alternateEmail": "test@bot.com",
    "state": "Somewhere",
    "zipCode": "2A090",
}

test.group('Auth register', (group) => {

    group.each.setup(async () => {
        await Database.beginGlobalTransaction()
        return () => Database.rollbackGlobalTransaction()
    })

    // Over 74 character, an email is considered invalid
    test('it should FAIL (422) when email is not a valid email', async ({ client }) => {
        const invalidEmail = 'anInvalidEmail@@gmail.com.fr'
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            email: invalidEmail
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "email",
                    "field": "email",
                    "message": "email validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when alternate email is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            alternateEmail: 'anInvalidEmail@@gmail.com.fr'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "email",
                    "field": "alternateEmail",
                    "message": "email validation failed"
                },
            ]
        })
    })

    test('it should FAIL (422) when alternatel email is identic of email', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            email: validEmail,
            alternateEmail: validEmail,
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "different",
                    "field": "alternateEmail",
                    "message": "different validation failed"
                },
            ]
        })

    })

    test('it should FAIL (422) when password is invalid', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
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
                    "message": "password must contain 12 character minimum with at least:\nOne minuscule\nOne majuscule\nOne numeric\nOne alphabetic character\nOne special character"
                },
            ]
        })
    })

    test('it should FAIL (422) when password is over 180 characters', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            password: 'anInvalidPasswordOver180Character+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',
            passwordConfirmation: 'anInvalidPasswordOver180Character+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [{
                "rule": "maxLength",
                "field": "password",
                "message": "maxLength validation failed",
                "args": {
                    "maxLength": 180
                }
            }]
        })
    })

    test('it should FAIL (422) when confirmedPassword is different of password', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            passwordConfirmation: 'anInvalidPassword'
        })
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

    test('it should FAIL (422) when firstName did not respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            firstName: '02Fabrice'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            firstName: 'anInvalidFirstNameOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            lastName: '02G'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            lastName: 'anInvalidLastNameOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            gender: 'anInvalidGender'
        })
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

    test('it should FAIL (422) when birthyear is not between before 130 year and today', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            birthYear: 1800
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            birthYear: 'stringValue'
        })
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

    test('it should FAIL (422) when state did not respect regex format', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            state: '678invalidState'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            state: 'invalidStateOverCharacterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
        })
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
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            zipCode: '2C678'
        })
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

    test(`it should register ${validEmail} like an unverified account`, async ({ client, assert }) => {
        const response = await client.post('/api/auth/register').json(validBody)
        response.assertAgainstApiSpec()
        response.assertStatus(201)

        const user = await User.findBy('email', validEmail)
        assert.exists(user)

        assert.isNull(user!.verifiedAt)
    })

    test('it should FAIL (422) when email is not unique', async ({ client }) => {
        const response = await client.post(ENDPOINT).json({
            ...validBody,
            email: 'bot@example.com'
        })
        response.assertAgainstApiSpec()
        response.assertStatus(422)
        response.assertBody({
            "errors": [
                {
                    "rule": "unique",
                    "field": "email",
                    "message": "unique validation failure"
                },
            ]
        })
    })

    test('it should return 400 status code error when email sending fails', async ({ client }) => {
        const email = "bot@test.com"
        const response = await client.post('/api/auth/register').json({
            ...validBody,
            email
        })
        response.assertAgainstApiSpec()
        response.assertStatus(400)
    })

    test('it should not register user when email sending fails', async ({ client, assert }) => {
        const email = "bot@test.com"
        await client.post('/api/auth/register').json({
            ...validBody,
            email
        })

        const user = await User.findBy('email', email)
        assert.notExists(user)
    })


})
