import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import UserRelationship from 'App/Models/UserRelationship'

export default class UserRelationshipPolicy extends BasePolicy {
    public async view(user: User, UserRelationship: UserRelationship) {
        return UserRelationship.relatingUserId === user.id
    }
    public async update(user: User, UserRelationship: UserRelationship) {
        return UserRelationship.relatingUserId === user.id
    }

    public async delete(user: User, UserRelationship: UserRelationship) {
        return UserRelationship.relatingUserId === user.id
    }
}
