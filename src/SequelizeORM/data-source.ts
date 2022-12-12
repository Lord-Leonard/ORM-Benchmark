import {Sequelize} from "sequelize-typescript";

import {Species} from "./entity/species";
import {Tree} from "./entity/tree";

export const sequelize = new Sequelize({
  database: 'sequelizedb',
  dialect : 'postgres',
  username: 'root',
  password: 'root',
  models: [Tree, Species],
  // repositoryMode: true,
  logging: false,
  // models: [__dirname + '/src/SequelizeORM/entity']
});
