import Factory from '@ioc:Adonis/Lucid/Factory'
import Message, { Type } from 'App/Models/Message'
import { UserFactory } from './UserFactory'


export const MessageFactory = Factory
    .define(Message, ({ faker }) => {
        return {
            content: faker.lorem.paragraph(),
            type: faker.helpers.arrayElement(Object.values(Type))
        }
    })
    .relation('relatingUser', () => UserFactory)
    .relation('relatedUsers', () => UserFactory)
    .build()