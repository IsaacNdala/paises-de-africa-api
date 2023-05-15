"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteColonia = exports.editColonia = exports.getColonia = exports.getColonias = exports.createColonia = void 0;
const colonia_1 = __importDefault(require("../models/colonia"));
const express_validator_1 = require("express-validator");
const createColonia = async (req, res, next) => {
    try {
        const { designacao } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const colonia = await colonia_1.default.create({ designacao });
        res.status(201).json({ msg: 'Cadastrado com sucesso', colonia });
    }
    catch (error) {
        next(error);
    }
};
exports.createColonia = createColonia;
const getColonias = async (req, res, next) => {
    try {
        const colonia = await colonia_1.default.findAll();
        res.status(200).json({ msg: 'Sucesso', colonia });
    }
    catch (error) {
        next(error);
    }
};
exports.getColonias = getColonias;
const getColonia = async (req, res, next) => {
    try {
        const { id } = req.params;
        const colonia = await colonia_1.default.findByPk(id);
        if (!colonia) {
            const error = new Error('Colónia não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ msg: 'Sucesso', colonia });
    }
    catch (error) {
        next(error);
    }
};
exports.getColonia = getColonia;
const editColonia = async (req, res, next) => {
    try {
        const { ColoniaId, designacao } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const colonia = await colonia_1.default.findByPk(ColoniaId);
        if (!colonia) {
            const error = new Error('Colónia não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        colonia.designacao = designacao;
        res.status(201).json({ msg: 'Editado com sucesso', colonia });
    }
    catch (error) {
        next(error);
    }
};
exports.editColonia = editColonia;
const deleteColonia = async (req, res, next) => {
    try {
        const { coloniaId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const colonia = await colonia_1.default.findByPk(coloniaId);
        if (!colonia) {
            const error = new Error('Colónia não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        await colonia.destroy();
        res.status(204).json({ msg: 'Deletado com sucesso', colonia });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteColonia = deleteColonia;
