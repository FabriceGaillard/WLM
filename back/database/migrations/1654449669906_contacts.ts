import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contacts extends BaseSchema {
    protected tableName = 'contacts'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('contact_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.uuid('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.unique(['contact_id', 'user_id'])
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
