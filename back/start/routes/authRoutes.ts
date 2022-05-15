import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.get('/confirm/:email', 'AuthController.confirmAccount').as('confirmAccount')
}).prefix('api/auth')