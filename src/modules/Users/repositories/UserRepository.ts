import { EntityRepository, Repository } from "typeorm";
import Users from "../models/Users";

@EntityRepository(Users)
class UsersRepository extends Repository<Users>{

    public async findByEmail(email: string){
        const userAlreadyExists = await this.findOne({
            where: { email }
        })
        return userAlreadyExists || null
    }
    
}

export default UsersRepository