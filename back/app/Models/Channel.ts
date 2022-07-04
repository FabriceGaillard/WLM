import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Channel extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    public id: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @beforeCreate()
    public static setId(channel: Channel) {
        channel.id = uuidv4()
    }
}
