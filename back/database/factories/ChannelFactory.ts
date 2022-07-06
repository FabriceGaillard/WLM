import Factory from '@ioc:Adonis/Lucid/Factory'
import Channel from 'App/Models/Channel'


export const ChannelFactory = Factory
    .define(Channel, () => {
        return {}
    })
    .build()