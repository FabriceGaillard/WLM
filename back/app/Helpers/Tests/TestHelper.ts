import { test } from "@japa/runner";
import User from "App/Models/User";
import { bot } from "Database/seeders/01-UserSeeder";
import ResponseAssertHelper from "./ResponseAssertHelper";
import RulesHelper from "./RulesHelper";

export default class TestHelper {

    public static ressourceNotFound(ressource: string, method: string, endpoint: string) {
        test(`it should FAIL (404) when ${ressource} is not found`, async ({ client }) => {
            const user = await User.firstOrFail()
            const response = await client[method](endpoint).loginAs(user)
            ResponseAssertHelper.error404(response, 'E_ROW_NOT_FOUND: Row not found')
        })
    }

    public static notAuthenticated(method: string, endpoint: string) {
        test('it should FAIL (401) when user is not authenticated', async ({ client }) => {
            const response = await client[method](endpoint)
            ResponseAssertHelper.error401(response)
        })
    }

    public static ressourceIdInvalid(ressource: string, method: string, endpoint: string) {
        test(`it should FAIL (422) when ${ressource} id is an invalid uuid`, async ({ client }) => {
            const user = await User.firstOrFail()
            const response = await client[method](endpoint).loginAs(user)
            ResponseAssertHelper.error422(response, [RulesHelper.uuid('params.id')])
        })
    }
}