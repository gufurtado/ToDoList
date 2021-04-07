import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class Users {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}

export default Users