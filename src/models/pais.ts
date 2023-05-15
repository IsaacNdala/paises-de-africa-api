import Sequelize, { Model } from 'sequelize';
import db from '../database/db';
import Regiao from './regiao';
import Colonia from './colonia';
import User from './user';

export interface IPais extends Model {
  id?: number;
  nome: string;
  capital: string;
  linguaOficial: string;
  presidente: string;
  dataIndependencia: string;
  regiaoId: number;
  coloniaId: number;
  userId: number;
  moeda: string;
  imagemBandeiraURL: string;
}

const Pais = db.define<IPais>('pais', {
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
  capital: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  moeda: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  linguaOficial: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  presidente: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dataIndependencia: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagemBandeiraURL: {
    type: Sequelize.STRING
  }
});

export default Pais;
