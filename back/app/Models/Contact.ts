import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Contact extends BaseModel {
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
}
