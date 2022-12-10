import {Sequelize} from "sequelize";

export const sequelize = new Sequelize('postgres://root:root@localhost:5432/streuobstportal')
