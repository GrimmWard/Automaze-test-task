import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tasks", "dev", "pass", {
  dialect: "sqlite",
  storage: "./tasks.sqlite",
  logging: false,
});

export default sequelize;
