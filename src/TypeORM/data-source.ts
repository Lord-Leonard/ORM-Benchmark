import "reflect-metadata"
import { DataSource } from "typeorm";
import { Tree } from "./entity/tree";
import {Species} from "./entity/species";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "Welcome1!",
  database: "streuobstportal",
  synchronize: true,
  logging: false,
  entities: [Tree, Species],
  subscribers: [],
  migrations: [],
})
