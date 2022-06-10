import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import UserRelationship from 'App/Models/UserRelationship'

export default class UserRelationshipPolicy extends BasePolicy {
    public async viewList(user: User, userId: string) {
        return userId === user.id
    }
    public async view(user: User, UserRelationship: UserRelationship) {
        return UserRelationship.relatingUserId === user.id
    }
    public async create(user: User, userId: string) {
        return userId === user.id
    }
    public async delete(user: User, UserRelationship: UserRelationship) {
        return UserRelationship.relatingUserId === user.id
    }
}
