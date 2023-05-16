"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.editUser = exports.getUser = exports.getUsers = exports.login = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const createUser = async (req, res, next) => {
    try {
        const { nome, sobreNome, email, password } = req.body;
        const file = req.file;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!file) {
            const error = new Error('Carregue uma foto');
            error.statusCode = 422;
            throw error;
        }
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const foundEmail = await user_1.default.findOne({ where: { email: email } });
        if (foundEmail) {
            const error = new Error(`O email ${email} já está sendo usado!`);
            error.statusCode = 422;
            throw error;
        }
        const hashPassword = await bcryptjs_1.default.hash(password, 12);
        const user = await user_1.default.create({
            nome,
            sobreNome,
            email,
            fotoURL: file.filename,
            password: hashPassword,
        });
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user.id
        }, process.env.JWT_SECRET, { expiresIn: '13d' });
        res.status(201).json({ msg: 'Cadastrado com sucesso', user, token });
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const user = await user_1.default.findOne({ where: { email: email } });
        if (!user) {
            const error = new Error(`O email ou senha errada!`);
            error.statusCode = 422;
            throw error;
        }
        const isEqual = await bcryptjs_1.default.compare(password, user.password);
        if (!isEqual) {
            const error = new Error(`O email ou senha errada!`);
            error.statusCode = 422;
            throw error;
        }
        const token = jsonwebtoken_1.default.sign({
            email: user.email,
            userId: user.id
        }, process.env.JWT_SECRET, { expiresIn: '13d' });
        console.log(token);
        res.status(200).json({ msg: 'Logado com sucesso', user, token });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const getUsers = async (req, res, next) => {
    try {
        const users = await user_1.default.findAll();
        res.status(200).json({ msg: 'Sucesso', users });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await user_1.default.findByPk(id);
        if (!user) {
            const error = new Error('User não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        res.status(200).json({ msg: 'Sucesso', user });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
const editUser = async (req, res, next) => {
    try {
        const { userId, nome, sobreNome, email } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            const error = new Error('User não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        user.nome = nome;
        user.sobreNome = sobreNome;
        user.email = email;
        await user.save();
        res.status(201).json({ msg: 'Editado com sucesso', user });
    }
    catch (error) {
        next(error);
    }
};
exports.editUser = editUser;
const deleteUser = async (req, res, next) => {
    try {
        const { userId } = req.body;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.statusCode = 422;
            throw error;
        }
        const user = await user_1.default.findByPk(userId);
        if (!user) {
            const error = new Error('User não encontrado!');
            error.statusCode = 422;
            throw error;
        }
        fs_1.default.unlink('/dist/uploads' + user.fotoURL, (err) => {
            console.log(err);
        });
        await user.destroy();
        res.status(204).json({ msg: 'Deletado com sucesso', user });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
