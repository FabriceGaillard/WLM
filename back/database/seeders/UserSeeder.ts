import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { gender, status } from 'App/Models/User'
import { DateTime } from 'luxon';

export const bot = {
    email: 'bot@example.com',
    password: 'TESTtest1234.',
    status: status.ONLINE,
    firstName: 'example',
    lastName: 'bot',
    gender: gender.UNBINARY,
    alternateEmail: 'bot@example.com',
    verifiedAt: DateTime.now(),
    personalMessage: "Hello i'm a bot"
}

export default class UserSeeder extends BaseSeeder {
    public async run() {
        const users = [
            bot
        ]
        await User.fetchOrCreateMany('email', users)
    }
}
