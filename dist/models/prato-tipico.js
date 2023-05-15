"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const db_1 = __importDefault(require("../database/db"));
const PratoTipico = db_1.default.define('pratoTipico', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    designacao: {
        type: sequelize_1.default.STRING,
        allowNull: false,
    },
    paisId: {
        type: sequelize_1.default.STRING,
    },
    imagemURL: {
        type: sequelize_1.default.STRING
    },
    userId: {
        type: sequelize_1.default.STRING
    }
});
exports.default = PratoTipico;
