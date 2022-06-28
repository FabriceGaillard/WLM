import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Group from 'App/Models/Group'

export default class GroupPolicy extends BasePolicy {
    public async update(user: User, group: Group) {
        return user.id === group.userId
    }
    public async destroy(user: User, group: Group) {
        return user.id === group.userId
    }
    public async view(user: User, group: Group) {
        return user.id === group.userId
    }
}
