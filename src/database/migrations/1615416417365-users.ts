import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class users1615416417365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
            name: "users",
            columns: [
                {
                    name:"id",
                    type:"uuid",
                    isPrimary:true,
                    generationStrategy:"uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name:"name",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"email",
                    type:"varchar",
                    isNullable:false
                },
                {
                    name:"password",
                    type:"varchar",
                    isNullable:false
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
