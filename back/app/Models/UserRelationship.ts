import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid'
import Group from 'App/Models/Group'


export default class UserRelationship extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column()
    public id: string

    @column()
    public relatingUserId: string

    @column()
    public relatedUserId: string

    @column()
    public groupId?: string

    @column()
    public isBlocked: boolean

    @column()
    public isDeleted: boolean

    @belongsTo(() => User, { localKey: 'id', foreignKey: 'relatingUserId' })
    public relatingUser: BelongsTo<typeof User>

    @belongsTo(() => User, { localKey: 'id', foreignKey: 'relatedUserId' })
    public relatedUser: BelongsTo<typeof User>

    @belongsTo(() => Group)
    public group: BelongsTo<typeof Group>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeCreate()
    public static setId(UserRelationship: UserRelationship) {
        UserRelationship.id = uuidv4()
    }

    @beforeCreate()
    public static isBlocked(UserRelationship: UserRelationship) {
        UserRelationship.isBlocked = false
    }

    @beforeCreate()
    public static isDeleted(UserRelationship: UserRelationship) {
        UserRelationship.isDeleted = false
    }
}
