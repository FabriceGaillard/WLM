import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { Type } from 'App/Models/Message'

export default class Messages extends BaseSchema {
    protected tableName = 'messages'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL')
            table.uuid('channel_id').references('id').inTable('channels').onDelete('CASCADE')
            table.text('content').notNullable()
            table.enum('type', Object.values(Type)).notNullable()
            table.timestamp('created_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
