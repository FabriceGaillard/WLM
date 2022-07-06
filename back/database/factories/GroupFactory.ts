import Factory from '@ioc:Adonis/Lucid/Factory'
import Group from 'App/Models/Group'



export const GroupFactory = Factory
    .define(Group, ({ faker }) => {
        return {
            name: faker.name.jobType()
        }
    })
    .build()