import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserRelationship from 'App/Models/UserRelationship'
import User from 'App/Models/User'
import { bot, bot2, bot3 } from './01-UserSeeder'

export default class UserRelationshipSeeder extends BaseSeeder {
    public async run() {
        const user = await User.findByOrFail('email', bot.email)
        const relationships = await User.query().whereIn('email', [bot2, bot3].map(user => user.email))
        await UserRelationship.createMany(relationships.map(relationship => ({
            relatingUserId: user.id,
            relatedUserId: relationship.id,
        })))
    }
}
