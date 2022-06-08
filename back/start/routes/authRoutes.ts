import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
    Route.get('verify/:email', 'AuthController.verify').as('verifyEmail')
    Route.post('reset-password-demand', 'AuthController.resetPasswordDemand')
    Route.patch('reset-password/:email', 'AuthController.resetPassword').as('resetPassword')
}).prefix('api/auth')

Route.group(() => {
    Route.get('me', 'AuthController.me')
    Route.get('logout', 'AuthController.logout')
}).prefix('api/auth').middleware(['auth'])

