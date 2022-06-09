import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Contact from 'App/Models/Contact'

export default class ContactPolicy extends BasePolicy {
    public async view(user: User, contact: Contact) {
        return contact.userId === user.id
    }
    public async delete(user: User, contact: Contact) {
        return contact.userId === user.id
    }
}
