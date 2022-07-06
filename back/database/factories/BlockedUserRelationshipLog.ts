import Factory from '@ioc:Adonis/Lucid/Factory'
import UserRelationship from 'App/Models/UserRelationship'
import { GroupFactory } from './GroupFactory'
import { UserFactory } from './UserFactory'


export const BlockedUserRelationshipLogFactory = Factory
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