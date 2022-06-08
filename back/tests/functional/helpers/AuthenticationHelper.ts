import User, { gender, status } from "App/Models/User"
import { ApiClient } from '@japa/api-client'
import { DateTime } from "luxon"

export const registerBody = {
    "email": "fabou291@gmail.com",
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

export default abstract class AuthenticationHelper {
    static async authenticate(client: ApiClient, credentials: { email: string, password: string }) {
        const login = await client.post('api/auth/login').json(credentials)

        const user = new User()
        user.merge(login.body())

        return user
    }
}