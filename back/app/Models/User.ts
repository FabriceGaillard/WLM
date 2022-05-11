import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate, beforeUpdate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
export default class User extends BaseModel {
    public static selfAssignPrimaryKey = true

    @column({ isPrimary: true })
    public id: string

    @column()
    public email: string

    @column({ serializeAs: null })
    public password: string

    @column()
    public rememberMeToken?: string

    @column()
    public username?: string

    @column()
    public status: 'online' | 'busy' | 'beRightBack' | 'away' | 'onThePhone' | 'outToLunch' | 'appearOffline'

    @column()
    public avatar: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password)
        }
    }

    @beforeCreate()
    public static setId(user: User) {
        user.id = uuidv4()
    }

    @beforeCreate()
    public static setAvatar(user: User) {
        /**
         * Il faudrat ici définir les chemins vers les avatars par défaut
         */
        const avatars = ['']
        user.avatar = avatars[~~(Math.random() * avatars.length)]
    }
}
