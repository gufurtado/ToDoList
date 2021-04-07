import { getCustomRepository } from "typeorm"
import UsersRepository from "../repositories/UserRepository"
import { hash } from 'bcryptjs'

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({name,email,password} : Request){
        const userRepository = getCustomRepository(UsersRepository)

        const userAlreadyExists = await userRepository.findByEmail(email)
        console.log('oi')

        if(userAlreadyExists !== null){
            throw Error(`Email already in use: ${email}`)
        }

        const hashedPass = await hash(password,8)

        const newUser = userRepository.create({
            name,
            email,
            password: hashedPass
        })

        await userRepository.save(newUser)

        return newUser
    }

}

export default CreateUserService