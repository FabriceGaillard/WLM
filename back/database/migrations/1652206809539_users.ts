import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { gender, status } from 'App/Models/User'
export default class UsersSchema extends BaseSchema {
    protected tableName = 'users'

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.uuid('id').primary()
            table.string('email', 255).notNullable().unique()
            table.string('password', 180).notNullable()
            table.string('remember_me_token').nullable()

            table.string('username', 255).nullable()
            table.string('personal_message', 255).nullable()
            table.enum('status', Object.values(status)).defaultTo(status.ONLINE)
            table.string('avatar', 255).notNullable()

            table.string('first_name', 255).notNullable()
            table.string('last_name', 255).notNullable()
            table.enum('gender', Object.values(gender)).notNullable()
            table.integer('birth_year', 255).nullable()
            table.string('alternate_email', 255).notNullable()
            table.string('country', 255).notNullable().defaultTo('france')
            table.string('state', 255).nullable()
            table.string('zip_code', 5).nullable()

            table.timestamp('confirmed_at').nullable()

            table.timestamp('created_at').notNullable()
            table.timestamp('updated_at').notNullable()
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
