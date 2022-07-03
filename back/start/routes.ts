import Route from '@ioc:Adonis/Core/Route'
import './routes/userRoutes'
import './routes/authRoutes'
import './routes/userRelationshipRoutes'
import './routes/groupRoutes'
import './routes/blockedUserRelationshipLogRoutes'

Route.get('/', ({ response }) => response.redirect().toPath('/api'))