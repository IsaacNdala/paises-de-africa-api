"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRegiao = exports.editRegiao = exports.getRegiao = exports.getRegioes = exports.createRegiao = void 0;
const regiao_1 = __importDefault(require("../models/regiao"));
const express_validator_1 = require("express-validator");
const createRegiao = async (req, res, next) => {
    try {
        const { designacao } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const regiao = await regiao_1.default.create({ designacao });
        res.status(201).json({ msg: 'Cadastrado com sucesso', regiao });
    }
    catch (error) {
        next(error);
    }
};
exports.createRegiao = createRegiao;
const getRegioes = async (req, res, next) => {
    try {
        const regioes = await regiao_1.default.findAll();
        res.status(200).json({ msg: 'Sucesso', regioes });
    }
    catch (error) {
        next(error);
    }
};
exports.getRegioes = getRegioes;
const getRegiao = async (req, res, next) => {
    try {
        const { id } = req.params;
        const regiao = await regiao_1.default.findByPk(id);
        if (!regiao) {
            const error = new Error('Região não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ msg: 'Sucesso', regiao });
    }
    catch (error) {
        next(error);
    }
};
exports.getRegiao = getRegiao;
const editRegiao = async (req, res, next) => {
    try {
        const { regiaoId, designacao } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const regiao = await regiao_1.default.findByPk(regiaoId);
        if (!regiao) {
            const error = new Error('Região não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        regiao.designacao = designacao;
        res.status(201).json({ msg: 'Editado com sucesso', regiao });
    }
    catch (error) {
        next(error);
    }
};
exports.editRegiao = editRegiao;
const deleteRegiao = async (req, res, next) => {
    try {
        const { regiaoId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const regiao = await regiao_1.default.findByPk(regiaoId);
        if (!regiao) {
            const error = new Error('Região não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        await regiao.destroy();
        res.status(204).json({ msg: 'Deletado com sucesso', regiao });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteRegiao = deleteRegiao;
