import { test } from "@japa/runner"
import User from "App/Models/User"
import RulesHelper from "./RulesHelper"

export default abstract class AuthenticationTestsHelper {
    public static notAuthenticated(method: string, endpoint: string) {
        test('should FAIL (401) when user is not authenticated', async ({ client }) => {
            const response = await client[method](endpoint)
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
    }

    public static ressourceIdInvalid(ressource: string, method: string, endpoint: string) {
        test(`should FAIL (422) when ${ressource} id is an invalid uuid`, async ({ client }) => {
            const user = await User.firstOrFail()
            const response = await client[method](endpoint).loginAs(user)
            response.assertAgainstApiSpec()
            response.assertStatus(422)
            response.assertBody([RulesHelper.uuid('id')])
        })
    }


}