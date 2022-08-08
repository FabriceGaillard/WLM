import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from './User'

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
    public content: string

    @column()
    public type: Type

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @belongsTo(() => User)
    public relatingUser: BelongsTo<typeof User>

    @manyToMany(() => User, {
        pivotTable: 'transmitted_messages',
        pivotTimestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        },
        pivotColumns: ['status'],
    })
    public relatedUsers: ManyToMany<typeof User>

    @beforeCreate()
    public static setId(message: Message) {
        message.id = uuidv4()
    }
}
