import { Router } from 'express'
import usersRouter from './Users.Routes'
import categoryRouter from './Categories.Routes'
import toDoRouter from './ToDo.Routes'

const routes = Router()

routes.use('/users',usersRouter)

routes.use('/categories',categoryRouter)

routes.use('/todos', toDoRouter)

export default routes