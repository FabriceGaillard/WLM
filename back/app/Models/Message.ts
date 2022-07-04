import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'
import Channel from './Channel'

export enum Type {
    MESSAGE = 'message',
    STATUS = 'status'
}

export default class Message extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    public id: string

    @column()
    public userId: string

    @column()
    public channelId: string

    @column()
    public content: string

    @column()
    public type: Type

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @belongsTo(() => Channel)
    public channel: BelongsTo<typeof Channel>

    @beforeCreate()
    public static setId(message: Message) {
        message.id = uuidv4()
    }
}
