import Route from '@ioc:Adonis/Core/Route'
import './routes/userRoutes'
import './routes/authRoutes'

Route.get('/', ({ response }) => response.redirect().toPath('/api'))