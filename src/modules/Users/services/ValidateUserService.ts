import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UserRepository"
import { hash, compare } from 'bcryptjs'
import Users from "../models/Users"
import authConfig from '../../../config/auth'
import { sign } from 'jsonwebtoken'

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Users;
    token: string;
}

class ValidateUserService {

    public async execute({ email, password} : Request){

        const userRepository = getCustomRepository(UsersRepository)
        
        const userValidated = await userRepository.findOne({
            where: {email:email}
        })

        const hashedPass = userValidated.password

        const userValid = await compare(password,hashedPass)

        if(!userValid){
            throw Error("User or password incorrect")
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: userValidated.id,
            expiresIn: authConfig.jwt.expiresIn
        })


        delete userValidated.password
        
        return {
            userValidated,
            token
        }
    }

}

export default ValidateUserService