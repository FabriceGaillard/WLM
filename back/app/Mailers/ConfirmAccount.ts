import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class ConfirmAccount extends BaseMailer {
    constructor(private user: User) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('confirm account')
            .to(this.user.email)
            .html(`Your account was confirmed ${this.user.username}`)
    }
}
