import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.get('unreaded', 'MessagesController.unreaded')
    Route.post('latest', 'MessagesController.latest')
    Route.post('store', 'MessagesController.store')
    Route.post('mark-as-readed', 'TransmittedMessagesController.markAsReaded')
}).prefix('api/messages').middleware(['auth'])