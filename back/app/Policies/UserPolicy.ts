import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'

export default class UserPolicy extends BasePolicy {
    public async update(user: User, resource: User) {
        return user.id === resource.id
    }
    public async delete(user: User, resource: User) {
        return user.id === resource.id
    }
}
