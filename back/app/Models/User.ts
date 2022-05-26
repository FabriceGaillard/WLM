import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export enum gender {
    MALE = 'male',
    FEMALE = 'female',
    UNBINARY = 'unbinary',
}

export enum status {
    ONLINE = 'online',
    BUSY = 'busy',
    BE_RIGHT_BACK = 'beRightBack',
    AWAY = 'away',
    ON_THE_PHONE = 'onThePhone',
    OUT_TO_LUNCH = 'outToLunch',
    APPEAR_OFFLINE = 'appearOffline'
}

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
    public personalMessage?: string

    @column()
    public status: status

    @column()
    public avatar: string

    @column()
    public firstName: string

    @column()
    public lastName: string

    @column()
    public gender: gender

    @column()
    public birthYear?: number

    @column()
    public alternateEmail: string

    @column()
    public country: string

    @column()
    public state?: string

    @column()
    public zipCode?: string

    @column.dateTime()
    public verifiedAt?: DateTime

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
        const path = 'assets/avatars/default/'
        const avatars = Array.from(Array(11).keys())
        user.avatar = path + avatars[~~(Math.random() * avatars.length)] + '.jpg'
    }

    @beforeCreate()
    public static setUsername(user: User) {
        user.username = user.email
    }

    @beforeCreate()
    public static setStatus(user: User) {
        user.status = status.ONLINE
    }

    @beforeCreate()
    public static setCountry(user: User) {
        user.country = 'france'
    }
}
