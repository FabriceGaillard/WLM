import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import User from 'App/Models/User';
import DestroyContactValidator from 'App/Validators/Contact/DestroyContactValidator';
import ShowContactValidator from 'App/Validators/Contact/ShowContactValidator';
import StoreContactValidator from 'App/Validators/Contact/StoreContactValidator'

export default class ContactsController {
    public async index({ auth }: HttpContextContract) {
        console.log('coucou')
        await auth.user!.load('contacts', (q) => q.preload('contact'))
        return auth.user!.contacts
    }

    public async show({ request, bouncer, response }: HttpContextContract) {
        const payload = await request.validate(ShowContactValidator)
        const contact = await Contact.find(payload.params.id)
        if (!contact) return response.notFound()

        await bouncer
            .with('ContactPolicy')
            .authorize('view', contact)

        await contact.load('contact')
        return contact
    }

    public async store({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(StoreContactValidator)
        const contact = await User.find(payload.contactId)
        if (!contact) {
            return response.badRequest()
        }

        await Contact.create({
            userId: auth.user!.id,
            contactId: contact.id
        })

        return response.created()
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        const payload = await request.validate(DestroyContactValidator)
        const contact = await Contact.find(payload.params.id)
        if (!contact) {
            return response.notFound()
        }

        await bouncer
            .with('ContactPolicy')
            .authorize('view', contact)

        await contact.delete()
        return response.noContent()
    }

}
