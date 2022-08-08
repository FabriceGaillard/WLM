import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export enum Status {
    PENDING = 'pending',
    READED = 'readed',
    BLOCKED = 'blocked',
}

export default class TransmittedMessages extends BaseSchema {
    protected tableName = 'transmitted_messages'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').primary()
            table.uuid('user_id').references('id').inTable('users').onDelete('SET NULL').nullable()
            table.uuid('message_id').references('id').inTable('messages').onDelete('CASCADE').notNullable()
            table.enum('status', Object.values(Status)).notNullable()
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
