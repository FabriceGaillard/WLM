import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'

export default class VerifyEmail extends BaseMailer {
    constructor(private recipient: string, private signedUrl: string) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('verify email')
            .to(this.recipient)
            .html(this.signedUrl)
    }
}
