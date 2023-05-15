import Sequelize, { Model } from 'sequelize';
import db from '../database/db';

export interface IColonia extends Model {
  id?: number | null;
  designacao: string 
} 

const Colonia = db.define<IColonia>('colonia', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  designacao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Colonia;