import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class ResetPasswordDemand extends BaseMailer {
    constructor(private recipient: string, private url: string) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('reset password demand')
            .to(this.recipient)
            .html(this.url)
    }
}
