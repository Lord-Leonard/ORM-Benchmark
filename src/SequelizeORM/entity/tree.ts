import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, NonAttribute} from "sequelize";
import {Point} from "geojson";
import {sequelize} from "../data-source";
import {Species} from "./species";

export class Tree extends Model<
  InferAttributes<Tree>,
  InferCreationAttributes<Tree>> {
  declare id: CreationOptional<number>

  declare point: Point
  declare species: NonAttribute<Species>

  //timestamp
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Tree.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    point: {
      type: DataTypes.GEOMETRY,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { sequelize }
)
