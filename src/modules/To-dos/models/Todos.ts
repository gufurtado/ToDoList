import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('todos')
class Todos {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    user_id: string;

    @Column()
    category_id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    checked: boolean;

    @Column('date')
    created_at: Date;
}

export default Todos