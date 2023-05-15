import Sequelize, { Model } from 'sequelize';
import db from '../database/db';

export interface IRegiao extends Model {
  id?: number | null;
  designacao: string 
} 

const Regiao = db.define<IRegiao>('regiao', {
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

export default Regiao;