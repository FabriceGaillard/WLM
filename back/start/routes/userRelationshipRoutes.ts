import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('user-relationships/index-of-authenticated-user', 'UserRelationshipsController.indexOfAuthenticatedUser')
    Route.post('user-relationships/store-or-makes-visible', 'UserRelationshipsController.storeOrMakesVisible')

    Route.resource('user-relationships', 'UserRelationshipsController').apiOnly().except(['store', 'index', 'destroy'])
}).prefix('api').middleware(['auth'])
