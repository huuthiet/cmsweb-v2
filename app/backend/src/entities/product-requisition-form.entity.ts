import { Entity, Column } from "typeorm";
import { BaseEntity } from "@entities/base.entity";

@Entity("product_requisition_form_tbl")
export class ProductRequisitionForm extends BaseEntity {
  @Column({ name: "company_name_column"})
  companyName?: string;

  @Column({ name: "status_column"})
  status?: string;

  @Column({ name: "recall_column"})
  recall?: string;

  @Column({ name: "recall_level_column"})
  recallLevel?: number;
}