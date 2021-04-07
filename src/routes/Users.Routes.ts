import { Router } from 'express'
import CreateUserService from '../modules/Users/services/CreateUserService'
import ValidateUserService from '../modules/Users/services/ValidateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
    try {

        const { email, password } = request.body

        const validUser = new ValidateUserService()

        const {userValidated, token} = await validUser.execute({email,password})

        console.log(token)

        return response.json({userValidated, token })

    } catch (err) {
        return response.status(400).json({error: err.message})
    } 
})

usersRouter.post('/new', async(request, response) => {
    try {
        const { name, email, password } = request.body

        const createUser = new CreateUserService()

        const user = await createUser.execute({name,email,password})

        return response.json(user)
    } catch (err) {
        return response.status(400).json({
            error: err.message
        })    
    }
})

export default usersRouter

