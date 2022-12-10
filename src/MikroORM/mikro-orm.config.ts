import {defineConfig} from "@mikro-orm/core";
import {BaseEntity, Species, Tree} from "./entities";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export default defineConfig({
  type: 'postgresql',
  dbName: 'streuobstportal',
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  entities: [Species, Tree, BaseEntity],
  highlighter: new SqlHighlighter(),
  discovery: { disableDynamicFileAccess: true },
});
