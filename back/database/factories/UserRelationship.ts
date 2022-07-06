import Factory from '@ioc:Adonis/Lucid/Factory'
import UserRelationship from 'App/Models/UserRelationship'
import { UserFactory } from './UserFactory'


export const GroupFactory = Factory
    .define(UserRelationship, ({ faker }) => {
        return {
            isBlocked: faker.datatype.boolean(),
            isHidden: faker.datatype.boolean()
        }
    })
    .relation('group', () => GroupFactory)
    .relation('relatedUser', () => UserFactory)
    .relation('relatingUser', () => UserFactory)
    .build()