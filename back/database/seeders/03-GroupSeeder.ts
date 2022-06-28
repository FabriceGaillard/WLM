import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Group from 'App/Models/Group'
import User from 'App/Models/User'
import { bot } from './01-UserSeeder'

export default class GroupSeederSeeder extends BaseSeeder {
    public async run() {
        const user = await User.findByOrFail('email', bot.email)
        await Group.createMany([
            {
                name: 'groupA',
                userId: user.id
            }
        ])
    }
}
