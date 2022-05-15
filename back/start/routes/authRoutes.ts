import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.get('/confirm/:email', 'AuthController.confirmAccount').as('confirmAccount')
    Route.post('/reset-password-demand', 'AuthController.resetPasswordDemand')
    Route.patch('/reset-password/:email', 'AuthController.resetPassword').as('resetPassword')
}).prefix('api/auth')