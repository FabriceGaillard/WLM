import User, { gender, status } from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import ArrayHelper from 'App/Helpers/ArrayHelper'
import { DateTime } from 'luxon'


export const UserFactory = Factory
    .define(User, ({ faker }) => {
        return {
            email: faker.internet.email(undefined, undefined, 'gmail.com'),
            password: faker.internet.password(),
            rememberMeToken: faker.random.alphaNumeric(20),
            username: faker.internet.userName(),
            personalMessage: faker.lorem.sentences(),
            status: ArrayHelper.random(Object.values(status)),
            avatar: faker.lorem.words(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            gender: ArrayHelper.random(Object.values(gender)),
            birthYear: ArrayHelper.random(
                Array.from(Array(130), (n) => n + DateTime.now().year - 130)
            ),
            alternateEmail: faker.internet.email(undefined, undefined, 'hotmail.com'),
            country: faker.address.cityName(),
            state: faker.address.zipCode(),
            verifiedAt: DateTime.fromISO(faker.date.past().toISOString()),
        }
    })
    .build()