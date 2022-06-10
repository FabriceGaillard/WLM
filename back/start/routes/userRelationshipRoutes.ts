import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.resource('user-relationships', 'UserRelationshipsController').apiOnly().except(['update'])
}).prefix('api/users/:userId').middleware(['auth'])
