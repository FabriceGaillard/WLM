import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Channels extends BaseSchema {
    protected tableName = 'channels'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.timestamp('created_at', { useTz: true })
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
