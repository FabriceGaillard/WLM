import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
export default class CautionChangementEmail extends BaseMailer {
    constructor(private recipient: string) {
        super()
    }
    public prepare(message: MessageContract) {
        message.subject('update email')
            .to(this.recipient)
            .html(`Your email has been modified, if you are not the author of this change, please contact our services.`)
    }
}
