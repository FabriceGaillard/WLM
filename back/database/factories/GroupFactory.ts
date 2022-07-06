import Factory from '@ioc:Adonis/Lucid/Factory'
import Group from 'App/Models/Group'
import { UserFactory } from './UserFactory'


export const GroupFactory = Factory
    .define(Group, ({ faker }) => {
        return {
            name: faker.name.jobType()
        }
    })
    .relation('user', () => UserFactory)
    .build()