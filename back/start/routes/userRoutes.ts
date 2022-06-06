import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('users', 'UsersController').apiOnly().except(['store', 'show', 'index'])
}).prefix('api').middleware(['auth'])