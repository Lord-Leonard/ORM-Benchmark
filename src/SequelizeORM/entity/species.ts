import {Column, CreatedAt, HasMany, Model, Table, UpdatedAt} from "sequelize-typescript";
import {Tree} from "./tree";

@Table
export class Species extends Model {
  @Column
  name!: string;

  @HasMany(() => Tree)
  trees: Tree[];

   @CreatedAt
  @Column
   declare createdAt: Date;

  @UpdatedAt
  @Column
  declare updatedAt: Date;

}
