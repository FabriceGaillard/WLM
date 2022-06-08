import User from "App/Models/User"
import { ApiClient } from '@japa/api-client'

export default abstract class AuthenticationHelper {
    static async authenticate(client: ApiClient, credentials: { email: string, password: string }) {
        const login = await client.post('api/auth/login').json(credentials)

        const user = new User()
        user.merge(login.body())

        return user
    }
}