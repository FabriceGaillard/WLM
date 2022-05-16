import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User, { gender, status } from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
    public async run() {
        const users = [
            {
                email: 'example@bot.com',
                password: 'test',
                status: status.ONLINE,
                firstName: 'example',
                lastName: 'bot',
                gender: gender.UNBINAY,
                alternateEmail: 'bot@example.com',
            }
        ];
        await User.fetchOrCreateMany('email', users)
    }
}
