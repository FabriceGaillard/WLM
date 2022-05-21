import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { gender, status } from 'App/Models/User'
import { DateTime } from 'luxon';

export default class UserSeeder extends BaseSeeder {
    public async run() {
        const users = [
            {
                email: 'bot@example.com',
                password: 'TESTtest1234.',
                status: status.ONLINE,
                firstName: 'example',
                lastName: 'bot',
                gender: gender.UNBINAY,
                alternateEmail: 'bot@example.com',
                confirmedAt: DateTime.now(),
                personalMessage: "Hello i'm a bot"
            }
        ];
        await User.fetchOrCreateMany('email', users)
    }
}
