import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
class Categories {

    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    user_id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('date')
    created_at: Date;
}

export default Categories