import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Contact from 'App/Models/Contact'
import User from 'App/Models/User'
import { bot, bot2, bot3 } from './01-UserSeeder'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        const user = await User.findByOrFail('email', bot.email)
        const contacts = await User.query().whereIn('email', [bot2, bot3].map(user => user.email))
        await Contact.createMany(contacts.map(contact => ({
            userId: user.id,
            contactId: contact.id
        })))
    }
}
