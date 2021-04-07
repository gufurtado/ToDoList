import { response, Router } from "express";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import TodosRepository from "../modules/To-dos/respositories/TodoRepository";
import CreateToDoService from "../modules/To-dos/services/CreateToDoService";


const toDoRouter = Router()
toDoRouter.use(ensureAuthenticated)

toDoRouter.get('/:category_id', async (request, response) => {
    const user_id = request.user.id
    const { category_id } = request.params


    const toDoRepository = getCustomRepository(TodosRepository)

    const allCategories = await toDoRepository.find({
        where: [{user_id,category_id}]
    })

    return response.json(allCategories)
})

toDoRouter.post('/', async(request, response) => {
    const { name, description, category_id} = request.body
    const user_id = request.user.id

    const createToDo = new CreateToDoService()

    try {
        const newToDo = await createToDo.execute({ user_id, category_id, name, description}) 
        return response.json(newToDo)   
    } catch (err) {
        return response.status(400).json({
            error: err.message
        })
    }
    
})

toDoRouter.patch('/', async(request, response) => {
    const { id, category_id, name, description } = request.body
    const user_id = request.user.id

    const toDoRepository = getCustomRepository(TodosRepository)
    
    const toDo = await toDoRepository.findOne({
        where: [{id, user_id, category_id}]
    })

    const updatedToDo = await toDoRepository.save({
        id: toDo.id,
        user_id,
        category_id,
        name,
        description
    })

    return response.json(updatedToDo)
})

toDoRouter.put('/', async(request, response) => {
    const { id, category_id, checked} = request.body
    const user_id = request.user.id

    const toDoRepository = getCustomRepository(TodosRepository)
    
    const toDo = await toDoRepository.findOne({
        where: [{id, user_id, category_id}]
    })

    const updatedToDo = await toDoRepository.save({
        id: toDo.id,
        user_id,
        checked
    })

    return response.json(updatedToDo)
})

toDoRouter.delete('/',async(request, response) => {
    const { id, category_id } = request.body
    const user_id = request.user.id

    const toDoRepository = getCustomRepository(TodosRepository)

    const toDo = await toDoRepository.findOne({
        where: [{id, user_id, category_id}]
    })
    
    await toDoRepository.delete(toDo)

    return response.json({
        success:'ok'
    })
})

export default toDoRouter