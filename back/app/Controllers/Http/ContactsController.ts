import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import StoreContactValidator from 'App/Validators/Contact/StoreContactValidator'

export default class ContactsController {
    public async index({ auth }: HttpContextContract) {
        await auth.user!.load('contacts')
        return auth.user!.contacts.map(contact => contact)
    }

    public async show({ auth, request }: HttpContextContract) {
        const contact = await Contact.query()
            .where('contactId', request.params().id)
            .andWhere('userId', auth.user!.id)
            .preload('contact')
            .first()

        return contact?.contact
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const payload = await request.validate(StoreContactValidator)

        try {
            await Contact.create({
                userId: auth.user!.id,
                contactId: payload.contactId
            })
        } catch (err) {
            return
        }

        return response.created()
    }

    public async destroy({ auth, request }: HttpContextContract) {
        await Contact.query()
            .where('contactId', request.params().id)
            .andWhere('userId', auth.user!.id)
            .delete()
        return
    }

}
