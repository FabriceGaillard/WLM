import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contact from 'App/Models/Contact'
import StoreContactValidator from 'App/Validators/Contact/StoreContactValidator'

export default class ContactsController {
    public async index({ auth }: HttpContextContract) {
        return await Contact.query().where('userId', auth.user!.id)
    }

    public async show({ auth, request }: HttpContextContract) {
        return await Contact.query()
            .where('userId', auth.user!.id)
            .andWhere('contactId', request.params().id)
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
