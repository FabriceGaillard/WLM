import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class BlockedUserRelationshipLogs extends BaseSchema {
    protected tableName = 'blocked_user_relationship_logs'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.uuid('relating_user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
            table.uuid('related_user_id').notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
            table.timestamp('started_at', { useTz: true }).notNullable()
            table.timestamp('ended_at', { useTz: true }).nullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
