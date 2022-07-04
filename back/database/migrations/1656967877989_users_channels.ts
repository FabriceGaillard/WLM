import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersChannels extends BaseSchema {
    protected tableName = 'users_channels'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE')
            table.uuid('channels_id').references('id').inTable('channels').onDelete('CASCADE')
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
