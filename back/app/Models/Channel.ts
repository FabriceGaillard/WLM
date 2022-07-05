import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'

export default class Channel extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    public id: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @manyToMany(() => User)
    public users: ManyToMany<typeof User>

    @beforeCreate()
    public static setId(channel: Channel) {
        channel.id = uuidv4()
    }
}
