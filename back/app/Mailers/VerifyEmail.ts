import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
export default class VerifyEmail extends BaseMailer {
    constructor(private recipient: string, private signedUrl: string) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('verify email')
            .to(this.recipient)
            .html(`<a href="http://${Env.get('HOST')}:${Env.get('PORT')}/${this.signedUrl}">${this.signedUrl}</a>`)
    }
}
