import Factory from '@ioc:Adonis/Lucid/Factory'
import Channel from 'App/Models/Channel'
import { UserFactory } from './UserFactory'

export const ChannelFactory = Factory
    .define(Channel, () => {
        return {}
    })
    .relation('users', () => UserFactory)
    .build()