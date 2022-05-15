import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User'

export default class ConfirmResetPassword extends BaseMailer {
    constructor(private user: User) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('confirm reset password')
            .to(this.user.email)
            .html(`New password was registered, ${this.user.username}`)
    }
}
