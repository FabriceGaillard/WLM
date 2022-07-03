import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BlockedUserRelationshipLog from 'App/Models/BlockedUserRelationshipLog'
import ShowBlockedUserRelationshipLogValidator from 'App/Validators/BlockedUserRelationshipLogValidator/ShowBlockedUserRelationshipLogValidator'

export default class BlockedUserRelationshipLogsController {
    public async indexOfAuthenticatedUser({ response, auth }: HttpContextContract) {

        const blockedRelationshipLog = await BlockedUserRelationshipLog.query()
            .where('relatingUserId', auth.user!.id)
            .preload('relatedUser')

        return response.ok(blockedRelationshipLog)
    }

    public async show({ request, response, bouncer }: HttpContextContract) {
        const payload = await request.validate(ShowBlockedUserRelationshipLogValidator)

        const blockedRelationshipLog = await BlockedUserRelationshipLog.findOrFail(payload.params.id)

        await bouncer
            .with('BlockedUserRelationshipLogPolicy')
            .authorize('view', blockedRelationshipLog)

        await blockedRelationshipLog.load('relatedUser')
        return response.ok(blockedRelationshipLog)
    }

}
