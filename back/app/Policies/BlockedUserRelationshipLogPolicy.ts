import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import BlockedUserRelationshipLog from 'App/Models/BlockedUserRelationshipLog'

export default class BlockedUserRelationshipLogPolicy extends BasePolicy {
    public async view(user: User, blockedUserRelationshipLog: BlockedUserRelationshipLog) {
        return blockedUserRelationshipLog.relatingUserId === user.id
    }
}
