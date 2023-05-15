"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../database/db"));
const Pais = db_1.default.define('pais', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    capital: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    moeda: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    linguaOficial: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    presidente: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    dataIndependencia: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    imagemBandeiraURL: {
        type: sequelize_1.default.STRING
    }
});
exports.default = Pais;
