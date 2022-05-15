import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly().except(['create'])
}).prefix('api').middleware(['auth'])