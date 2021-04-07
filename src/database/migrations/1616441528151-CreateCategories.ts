import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1616441528151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "categories",
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
                    name:"created_at",
                    type:"date",
                    isNullable:true,
                    default: "now()"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("categories")
    }

}
