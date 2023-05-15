import Sequelize, { Model } from 'sequelize';
import db from '../database/db';

export interface IUser extends Model {
  id?: number | null;
  nome: string;
  sobreNome: string;
  email: string;
  password: string;
  fotoURL: string;
} 

const User = db.define<IUser>('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sobreNome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fotoURL: {
    type: Sequelize.STRING
  },
});

export default User;