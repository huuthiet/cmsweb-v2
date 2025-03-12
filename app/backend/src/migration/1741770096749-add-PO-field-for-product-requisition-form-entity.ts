import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPOFieldForProductRequisitionFormEntity1741770096749 implements MigrationInterface {
    name = 'AddPOFieldForProductRequisitionFormEntity1741770096749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` ADD \`PO_column\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_requisition_form_tbl\` DROP COLUMN \`PO_column\``);
    }

}
