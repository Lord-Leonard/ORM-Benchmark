import "reflect-metadata"
import {DataSource, DataSourceOptions} from "typeorm";
import { Tree } from "./entity/tree";
import {Species} from "./entity/species";

export const typeormDatabaseOptions: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: "typeormdb",
  synchronize: true,
  logging: false,
  entities: [Tree, Species],
};
