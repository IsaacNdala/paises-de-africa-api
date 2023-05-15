import Sequelize, { Model } from 'sequelize';
import db from '../database/db';

export interface IPratoTipico extends Model {
  id?: number | null;
  designacao: string;
  paisId: string;
  imagemURL?: string;
  userId: string;
} 

const PratoTipico = db.define<IPratoTipico>('pratoTipico', {
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
  paisId: {
    type: Sequelize.STRING,
  },
  imagemURL: {
    type: Sequelize.STRING
  },
  userId: {
    type: Sequelize.STRING
  }
});

export default PratoTipico;