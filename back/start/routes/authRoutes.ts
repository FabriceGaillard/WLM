import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.get('/verify/:email', 'AuthController.verify').as('verifyEmail')
    Route.post('/reset-password-demand', 'AuthController.resetPasswordDemand')
    Route.patch('/reset-password/:email', 'AuthController.resetPassword').as('resetPassword')
    Route.get('/logout', 'AuthController.logout')
    Route.get('/me', 'AuthController.me')
}).prefix('api/auth')