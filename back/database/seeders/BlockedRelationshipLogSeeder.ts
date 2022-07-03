import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import BlockedUserRelationshipLog from 'App/Models/BlockedUserRelationshipLog'
import User from 'App/Models/User'
import { bot, bot2 } from './01-UserSeeder'

export default class BlockedUserRelationshipLogSeeder extends BaseSeeder {
    public async run() {

        const user1 = await User.findByOrFail('email', bot.email)
        const user2 = await User.findByOrFail('email', bot2.email)

        await BlockedUserRelationshipLog.createMany([
            {
                relatingUserId: user1.id,
                relatedUserId: user2.id,
            }
        ])

    }
}
