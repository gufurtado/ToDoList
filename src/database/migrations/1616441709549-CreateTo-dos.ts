import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateToDos1616441709549 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "todos",
            columns: [
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true,
                    generationStrategy:"uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name:"user_id",
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"category_id",
                    type:"uuid",
                    isPrimary:true
                },
                {
                    name:"name",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"description",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"checked",
                    type:"boolean",
                    isNullable:false
                },
                {
                    name:"created_at",
                    type:"date",
                    isNullable:true,
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("todos")
    }

}
