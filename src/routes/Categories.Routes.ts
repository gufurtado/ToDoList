import { response, Router } from "express";
import { getCustomRepository } from "typeorm";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import CategoriesRepository from "../modules/Categories/repositories/CategoryRepository";
import CreateCategoryService from "../modules/Categories/services/CreateCategoryService";


const categoryRouter = Router()
categoryRouter.use(ensureAuthenticated)

categoryRouter.get('/', async (request, response) => {
    const user_id = request.user.id

    const categoryRepository = getCustomRepository(CategoriesRepository)

    const allCategories = await categoryRepository.find({
        where: {user_id: user_id}
    })

    return response.json(allCategories)
})

categoryRouter.post('/', async(request, response) => {
    const { name, description} = request.body
    const user_id = request.user.id

    const createCategory = new CreateCategoryService()

    try {
        const newCategory = await createCategory.execute({ user_id, name, description}) 
        return response.json(newCategory)   
    } catch (err) {
        return response.status(400).json({
            error: err.message
        })
    }
    
})

categoryRouter.patch('/', async(request, response) => {
    const { id,name, description } = request.body
    const user_id = request.user.id

    console.log(id,name,description,user_id)

    const categoryRepository = getCustomRepository(CategoriesRepository)
    
    const category = await categoryRepository.findOne({
        where: [{id, user_id}]
    })

    const updatedCategory = await categoryRepository.save({
        id: category.id,
        user_id,
        name,
        description
    })

    return response.json(updatedCategory)
})

categoryRouter.delete('/',async(request, response) => {
    const { id } = request.body
    const user_id = request.user.id

    const categoryRepository = getCustomRepository(CategoriesRepository)

    const category = await categoryRepository.findOne({
        where: [{id, user_id}]
    })
    
    await categoryRepository.delete(category)

    return response.json({
        success:'ok'
    })
})

export default categoryRouter