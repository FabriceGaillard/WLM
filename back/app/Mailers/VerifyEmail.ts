import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
export default class VerifyEmail extends BaseMailer {
    constructor(private recipient: string, private url: string) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('verify email')
            .to(this.recipient)
            .html(`<a href="${this.url}">${this.url}</a>`)
    }
}
