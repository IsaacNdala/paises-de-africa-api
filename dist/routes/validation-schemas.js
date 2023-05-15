"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.deleteColonia = exports.editColonia = exports.createColonias = exports.deleteRegiao = exports.editRegiao = exports.createRegiao = exports.createPais = void 0;
const express_validator_1 = require("express-validator");
// Pais
exports.createPais = (0, express_validator_1.checkSchema)({
    nome: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo nome é obrigatório!',
    },
    capital: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo capital é obrigatório!',
    },
    moeda: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo moeda é obrigatório!',
    },
    linguaOficial: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo linguaOficial é obrigatório!',
    },
    presidente: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo presidente é obrigatório!',
    },
    dataIndependencia: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo dataIndependencia é obrigatório!',
    },
    regiaoId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo regiaoId é obrigatório!',
    },
    coloniaId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo coloniaId é obrigatório!',
    },
    userId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo userId é obrigatório!',
    },
});
// Fim Pais
// Regiao
exports.createRegiao = (0, express_validator_1.checkSchema)({
    designacao: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo designacao é obrigatório!',
    },
});
exports.editRegiao = (0, express_validator_1.checkSchema)({
    regiaoId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo regiaoId é obrigatório!',
    },
    designacao: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo designacao é obrigatório!',
    },
});
exports.deleteRegiao = (0, express_validator_1.checkSchema)({
    regiaoId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo regiaoId é obrigatório!',
    }
});
// Fim Regiao
// Colonia
exports.createColonias = (0, express_validator_1.checkSchema)({
    designacao: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo designacao é obrigatório!',
    },
});
exports.editColonia = (0, express_validator_1.checkSchema)({
    coloniaId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo coloniaId é obrigatório!',
    },
    designacao: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo designacao é obrigatório!',
    },
});
exports.deleteColonia = (0, express_validator_1.checkSchema)({
    coloniaId: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo coloniaId é obrigatório!',
    }
});
// Fim Colonia
// Auth
exports.createUser = (0, express_validator_1.checkSchema)({
    nome: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo nome é obrigatório!',
    },
    sobreNome: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo sobreNome é obrigatório!',
    },
    email: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo email é obrigatório!',
    },
    password: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo passowrd é obrigatório!',
    },
});
exports.login = (0, express_validator_1.checkSchema)({
    email: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo email é obrigatório!',
    },
    password: {
        notEmpty: true,
        trim: true,
        errorMessage: 'O campo passowrd é obrigatório!',
    },
});
// Fim Auth
