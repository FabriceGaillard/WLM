import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { v4 as uuidv4 } from 'uuid'


export default class Contact extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column()
    public id: string

    @column()
    public userId: string

    @column()
    public contactId: string

    @belongsTo(() => User)
    public user: BelongsTo<typeof User>

    @belongsTo(() => User)
    public contact: BelongsTo<typeof User>

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeCreate()
    public static setId(contact: Contact) {
        contact.id = uuidv4()
    }
}
