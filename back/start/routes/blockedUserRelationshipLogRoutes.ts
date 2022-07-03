import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('blocked-user-relationship-logs/index-of-authenticated-user', 'BlockedUserRelationshipLogsController.indexOfAuthenticatedUser')
    Route.resource('blocked-user-relationship-logs', 'BlockedUserRelationshipLogsController').apiOnly().only(['show'])
}).prefix('api').middleware(['auth'])