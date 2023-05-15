import { Dialect } from './../../node_modules/sequelize/types/sequelize.d';
import { Sequelize } from 'sequelize';

const connection = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    dialect: process.env.DB_DIALECT! as Dialect,
    host: process.env.DB_HOST!,
  },
);

export default connection;
