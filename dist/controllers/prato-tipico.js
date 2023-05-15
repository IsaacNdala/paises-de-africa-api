"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePratoTipico = exports.editPratoTipico = exports.getPratoTipico = exports.getPratoTipicos = exports.createPratoTipico = void 0;
const prato_tipico_1 = __importDefault(require("../models/prato-tipico"));
const express_validator_1 = require("express-validator");
const createPratoTipico = async (req, res, next) => {
    try {
        const { designacao, paisId, userId } = req.body;
        const file = req.file;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const obj = { designacao, paisId, userId };
        if (file) {
            obj.imagemURL = 'images/' + file.filename;
        }
        const pratoTipico = await prato_tipico_1.default.create(obj);
        res.status(201).json({ msg: 'Cadastrado com sucesso', pratoTipico });
    }
    catch (error) {
        next(error);
    }
};
exports.createPratoTipico = createPratoTipico;
const getPratoTipicos = async (req, res, next) => {
    try {
        const pratoTipico = await prato_tipico_1.default.findAll();
        res.status(200).json({ msg: 'Sucesso', pratoTipico });
    }
    catch (error) {
        next(error);
    }
};
exports.getPratoTipicos = getPratoTipicos;
const getPratoTipico = async (req, res, next) => {
    try {
        const { id } = req.params;
        const pratoTipico = await prato_tipico_1.default.findByPk(id);
        if (!pratoTipico) {
            const error = new Error('Prato não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ msg: 'Sucesso', pratoTipico });
    }
    catch (error) {
        next(error);
    }
};
exports.getPratoTipico = getPratoTipico;
const editPratoTipico = async (req, res, next) => {
    try {
        const { designacao, paisId, pratoTipicoId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const pratoTipico = await prato_tipico_1.default.findByPk(pratoTipicoId);
        if (!pratoTipico) {
            const error = new Error('Prato não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        pratoTipico.designacao = designacao;
        pratoTipico.paisId = paisId;
        res.status(201).json({ msg: 'Editado com sucesso', pratoTipico });
    }
    catch (error) {
        next(error);
    }
};
exports.editPratoTipico = editPratoTipico;
const deletePratoTipico = async (req, res, next) => {
    try {
        const { pratoTipicoId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const pratoTipico = await prato_tipico_1.default.findByPk(pratoTipicoId);
        if (!pratoTipico) {
            const error = new Error('Prato não encontrada!');
            error.statusCode = 422;
            throw error;
        }
        await pratoTipico.destroy();
        res.status(204).json({ msg: 'Deletado com sucesso', pratoTipico });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePratoTipico = deletePratoTipico;
