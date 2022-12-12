import {BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt} from "sequelize-typescript";
import {Point} from "geojson";
import {Species} from "./species";
import { DataTypes } from "sequelize";

@Table
export class Tree extends Model<Tree> {
  @Column(DataTypes.GEOMETRY('POINT', 4326))
  point: Point;

  @ForeignKey(() => Species)
  @Column
  speciesId!: number;

  @BelongsTo(() => Species)
  species!: Species;

  @Column("float")
  height!: number;

  @Column
  trunkCircumference!: number;

  @Column
  careState!: string;

  @Column
  strikingForLandscape!: boolean;

  @Column("bigint")
  yearOfPlanting!: number;

  @Column
  cropSize!: number;

  @Column
  juiceAmount!: number;

  @Column
  sponsorSearched!: boolean;

  @Column
  active!: boolean;

  @CreatedAt
  @Column
  declare createdAt: Date;

  @UpdatedAt
  @Column
  declare updatedAt: Date;

}
