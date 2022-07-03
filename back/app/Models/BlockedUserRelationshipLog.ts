import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from 'App/Models/User'

export default class BlockedUserRelationshipLog extends BaseModel {
    public static selfAssignPrimaryKey = true
    @column({ isPrimary: true })
    public id: string

    @column()
    public relatingUserId: string

    @column()
    public relatedUserId: string

    @column.dateTime({ autoCreate: true })
    public startedAt: DateTime

    @column.dateTime()
    public endedAt?: DateTime

    @belongsTo(() => User, { localKey: 'id', foreignKey: 'relatingUserId' })
    public relatingUser: BelongsTo<typeof User>

    @belongsTo(() => User, { localKey: 'id', foreignKey: 'relatedUserId' })
    public relatedUser: BelongsTo<typeof User>

    @beforeCreate()
    public static setId(user: User) {
        user.id = uuidv4()
    }
}
