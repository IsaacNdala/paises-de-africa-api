"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePais = exports.editPais = exports.getPais = exports.getPaises = exports.createPais = void 0;
const pais_1 = __importDefault(require("../models/pais"));
const express_validator_1 = require("express-validator");
const regiao_1 = __importDefault(require("../models/regiao"));
const colonia_1 = __importDefault(require("../models/colonia"));
const user_1 = __importDefault(require("../models/user"));
const createPais = async (req, res, next) => {
    try {
        const { nome, capital, linguaOficial, presidente, dataIndependencia, regiaoId, moeda, coloniaId, userId, } = req.body;
        const file = req.file;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!file) {
            const error = new Error('Carregue a imagem da bandeira!');
            error.statusCode = 422;
            throw error;
        }
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const foundPais = await pais_1.default.findOne({ where: { nome: nome } });
        if (foundPais) {
            const error = new Error('País já existe!');
            error.statusCode = 422;
            throw error;
        }
        const pais = await pais_1.default.create({
            nome,
            capital,
            linguaOficial,
            presidente,
            dataIndependencia,
            regiaoId,
            coloniaId,
            moeda,
            userId,
            imagemBandeiraURL: 'images/' + file.filename,
        });
        res.status(201).json({ msg: 'Cadastrado com sucesso', pais });
    }
    catch (error) {
        next(error);
    }
};
exports.createPais = createPais;
const getPaises = async (req, res, next) => {
    try {
        const paises = await pais_1.default.findAll({
            include: [{ model: regiao_1.default }, { model: colonia_1.default }, { model: user_1.default }],
        });
        res.status(200).json({ msg: 'Sucesso', paises });
    }
    catch (error) {
        next(error);
    }
};
exports.getPaises = getPaises;
const getPais = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pais = await pais_1.default.findOne({
            where: { id: id },
            include: [{ model: regiao_1.default }, { model: colonia_1.default }, { model: user_1.default }],
        });
        if (!pais) {
            const error = new Error('País não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ msg: 'Sucesso', pais });
    }
    catch (error) {
        next(error);
    }
};
exports.getPais = getPais;
const editPais = async (req, res, next) => {
    try {
        const { paisId, nome, capital, linguaOficial, presidente, dataIndependencia, regiaoId, moeda, coloniaId, userId, } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const pais = await pais_1.default.findByPk(paisId);
        if (!pais) {
            const error = new Error('País não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        pais.nome = nome;
        pais.capital = capital;
        pais.moeda = moeda;
        pais.linguaOficial = linguaOficial;
        pais.presidente = presidente;
        pais.dataIndependencia = dataIndependencia;
        pais.regiaoId = regiaoId;
        pais.coloniaId = coloniaId;
        pais.userId = userId;
        await pais.save();
        res.status(201).json({ msg: 'Editado com sucesso', pais });
    }
    catch (error) {
        next(error);
    }
};
exports.editPais = editPais;
const deletePais = async (req, res, next) => {
    try {
        const { paisId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const pais = await pais_1.default.findByPk(paisId);
        if (!pais) {
            const error = new Error('País não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        await pais.destroy();
        res.status(204).json({ msg: 'Deletado com sucesso', pais });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePais = deletePais;
