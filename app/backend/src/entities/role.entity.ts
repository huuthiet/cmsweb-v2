import { Entity, Column, OneToMany } from "typeorm";
import { Base } from "@entities/base.entity";
import { Permission } from "./permission.entity";
import { UserRole } from "./user-role.entity";

@Entity("role_tbl")
export class Role extends Base {
  @Column({ name: "name_normalize_column", nullable: false, unique: true })
  nameNormalize?: string;

  @Column({ name: "description_column" })
  description?: string;

  // A role can have many permissions
  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];

  // A role can have many user roles
  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}