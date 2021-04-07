import { response } from "express"
import { getCustomRepository } from "typeorm"
import CategoriesRepository from "../repositories/CategoryRepository"

interface Request {
    user_id: string;
    name: string;
    description: string;
}

class CreateCategoryService {
    public async execute({ user_id, name, description} : Request){
        const categoryRepository = getCustomRepository(CategoriesRepository)

        const categoryAlreadyExists = await categoryRepository.findOne({
            where: [{user_id, name}]
        })

        if(categoryAlreadyExists !== undefined){
            throw new Error('Category already exists!')
        }

        const newCategory = categoryRepository.create({
            user_id,
            name,
            description
        })

        const category = await categoryRepository.save(newCategory)

        return category
    }
}

export default CreateCategoryService