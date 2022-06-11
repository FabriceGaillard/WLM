import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly().except(['store', 'show', 'index'])
    Route.patch('users/:id/update-password', 'UsersController.updatePassword')
    Route.patch('users/:id/update-email', 'UsersController.updateEmail')
}).prefix('api').middleware(['auth'])