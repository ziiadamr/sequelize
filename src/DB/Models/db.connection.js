import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const sequelize_config = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

export const dbConnection = async () => {
  try {
    await sequelize_config.sync({ alter: true, force: false });
    console.log("database connected successfully ✅");
  } catch (error) {
    console.log("error ❌ : ", error);
  }
};
