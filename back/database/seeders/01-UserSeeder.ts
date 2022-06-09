import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { gender, status } from 'App/Models/User'
import { DateTime } from 'luxon';

const bots = [{
    email: 'bot@example.com',
    password: 'TESTtest1234.',
    status: status.ONLINE,
    firstName: 'example',
    lastName: 'bot',
    gender: gender.UNBINARY,
    alternateEmail: 'bot@example.com',
    verifiedAt: DateTime.now(),
    personalMessage: "Hello i'm a bot"
}, {
    email: 'bot2@example.com',
    password: 'TESTtest1234.',
    status: status.ONLINE,
    firstName: 'example',
    lastName: 'bot',
    gender: gender.UNBINARY,
    alternateEmail: 'bot2@example.com',
    verifiedAt: DateTime.now(),
    personalMessage: "Hello i'm a bot2"
}, {
    email: 'bot3@example.com',
    password: 'TESTtest1234.',
    status: status.ONLINE,
    firstName: 'example',
    lastName: 'bot',
    gender: gender.UNBINARY,
    alternateEmail: 'bot2@example.com',
    verifiedAt: DateTime.now(),
    personalMessage: "Hello i'm a bot3"
}]

export default class UserSeeder extends BaseSeeder {
    public async run() {
        await User.fetchOrCreateMany('email', bots)
    }
}
const [bot, bot2, bot3] = bots
export { bot, bot2, bot3 }
