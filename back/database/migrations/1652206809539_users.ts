import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('email', 255).notNullable().unique()
            table.string('password', 180).notNullable()
            table.string('remember_me_token').nullable()

            table.string('username').nullable()
            table.enum('status', ['online', 'busy', 'beRightBack', 'away', 'onThePhone', 'outToLunch', 'appearOffline']).defaultTo('online')
            table.string('avatar', 255).notNullable()

            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').notNullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
