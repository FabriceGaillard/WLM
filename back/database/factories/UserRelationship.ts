import Factory from '@ioc:Adonis/Lucid/Factory'
import UserRelationship from 'App/Models/UserRelationship'



export const GroupFactory = Factory
    .define(UserRelationship, ({ faker }) => {
        return {
            isBlocked: faker.datatype.boolean(),
            isHidden: faker.datatype.boolean()
        }
    })
    .build()