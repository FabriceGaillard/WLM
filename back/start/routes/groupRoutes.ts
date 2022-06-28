import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('groups', 'GroupsController').apiOnly()
}).prefix('api').middleware(['auth'])