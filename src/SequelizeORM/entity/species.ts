import {sequelize} from "../data-source";
import {Association, CreationOptional, DataTypes, Model, NonAttribute} from "sequelize";
import {Tree} from "./tree"

export class Species extends Model {
  declare id: CreationOptional<number>;
  declare name: string;

  declare trees?: NonAttribute<Tree[]>
  
  // timestamps!
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    trees: Association<Species, Tree>;
  };
}

Species.init({
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
}, { sequelize })

Species.hasMany(Tree);
