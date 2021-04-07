import { getCustomRepository } from "typeorm"
import TodosRepository from "../respositories/TodoRepository"

interface Request {
    user_id: string;
    category_id: string;
    name: string;
    description: string;
}

class CreateToDoService {
    public async execute({ user_id, category_id, name, description} : Request){
        const toDoRepository = getCustomRepository(TodosRepository)

        const todoAlreadyExists = await toDoRepository.findOne({
            where: [{user_id,category_id,name}]
        })

        if(todoAlreadyExists !== undefined){
            throw new Error('Category already exists!')
        }

        const newToDo = toDoRepository.create({
            user_id,
            category_id,
            name,
            description,
            checked:false
        })

        const toDo = await toDoRepository.save(newToDo)

        return toDo
    }
}

export default CreateToDoService