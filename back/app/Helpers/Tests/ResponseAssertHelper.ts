export default class ResponseAssertHelper {
    public static minimalAssert(response: ApiResponse, statusCode: number) {
        response.assertAgainstApiSpec()
        response.assertStatus(statusCode)
    }

    public static noContent(response: ApiResponse) {
        ResponseAssertHelper.minimalAssert(response, 204)
        response.assertBody({})
    }

    public static error400(response: ApiResponse, body: any = {}) {
        ResponseAssertHelper.minimalAssert(response, 400)
        response.assertBody(body)
    }

    public static error401(response: ApiResponse) {
        ResponseAssertHelper.minimalAssert(response, 401)
        response.assertBody({ errors: [{ message: 'E_UNAUTHORIZED_ACCESS: Unauthorized access' }] })
    }

    public static error403(response: ApiResponse) {
        ResponseAssertHelper.minimalAssert(response, 403)
        response.assertBody({ message: 'E_AUTHORIZATION_FAILURE: Not authorized to perform this action' })
    }

    public static error404(response: ApiResponse, message?: string) {
        ResponseAssertHelper.minimalAssert(response, 404)
        response.assertBody({ message })
    }

    public static error422(response: ApiResponse, rules: any[]) {
        ResponseAssertHelper.minimalAssert(response, 422)
        response.assertBody({ "errors": rules })
    }
}