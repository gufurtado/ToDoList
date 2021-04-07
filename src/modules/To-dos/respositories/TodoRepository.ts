import { EntityRepository, Repository } from "typeorm";
import Todos from "../models/Todos";

@EntityRepository(Todos)
class TodosRepository extends Repository<Todos>{

    
}

export default TodosRepository