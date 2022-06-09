import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('contacts', 'ContactsController').apiOnly().except(['update'])
}).prefix('api/').middleware(['auth'])
