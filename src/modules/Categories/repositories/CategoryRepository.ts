import { EntityRepository, Repository } from "typeorm";
import Categories from "../models/Categories";

@EntityRepository(Categories)
class CategoriesRepository extends Repository<Categories>{

    
}

export default CategoriesRepository