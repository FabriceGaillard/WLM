import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRelationshipsSchema extends BaseSchema {
    protected tableName = 'user_relationships'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary
            table.uuid('relating_user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.uuid('related_user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
            table.boolean('is_blocked').notNullable()
            table.boolean('is_deleted').notNullable()
            table.timestamp('created_at', { useTz: true })
            table.timestamp('updated_at', { useTz: true })
            table.unique(['relating_user_id', 'related_user_id'])
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
