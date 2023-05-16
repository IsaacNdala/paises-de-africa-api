import { RequestHandler } from 'express';
import User, { IUser } from '../models/user';
import { validationResult } from 'express-validator';
import bycript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { nome, sobreNome, email, password } = req.body;
    const file = req.file;
    const errors = validationResult(req);

    if(!file) {
      const error: IError = new Error('Carregue uma foto');
      error.statusCode = 422;
      throw error;
    }

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const foundEmail = await User.findOne({ where: { email: email } });

    if(foundEmail) {
      const error: IError = new Error(`O email ${email} já está sendo usado!`);
      error.statusCode = 422;
      throw error;
    }

    const hashPassword = await bycript.hash(password, 12);

    const user = await User.create({ 
      nome,
      sobreNome,
      email,
      fotoURL: file.filename,
      password: hashPassword,
    });

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      process.env.JWT_SECRET!,
      { expiresIn: '13d' },
    );

    res.status(201).json({ msg: 'Cadastrado com sucesso', user, token });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findOne({ where: { email: email } });

    if(!user) {
      const error: IError = new Error(`O email ou senha errada!`);
      error.statusCode = 422;
      throw error;
    }

    const isEqual = await bycript.compare(password, user.password);

    if(!isEqual) {
      const error: IError = new Error(`O email ou senha errada!`);
      error.statusCode = 422;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user.id
      },
      process.env.JWT_SECRET!,
      { expiresIn: '13d' },
    );

    console.log(token)

    res.status(200).json({ msg: 'Logado com sucesso', user, token });
  } catch (error) {
    next(error);
  }
};

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ msg: 'Sucesso', users });
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if(!user) {
      const error: IError = new Error('User não encontrado!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ msg: 'Sucesso', user });
  } catch (error) {
    next(error);
  }
};

export const editUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId, nome, sobreNome, email } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findByPk(userId);

    if(!user) {
      const error: IError = new Error('User não encontrado!');
      error.statusCode = 422;
      throw error;
    }

    user.nome = nome;
    user.sobreNome = sobreNome;
    user.email = email;
    
    await user.save();

    res.status(201).json({ msg: 'Editado com sucesso', user });
  } catch (error) {
    next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const user = await User.findByPk(userId);

    if(!user) {
      const error: IError = new Error('User não encontrado!');
      error.statusCode = 422;
      throw error;
    }

    fs.unlink('/dist/uploads' + user.fotoURL, (err) => {
      console.log(err)
    });

    await user.destroy();

    res.status(204).json({ msg: 'Deletado com sucesso', user });
  } catch (error) {
    next(error);
  }
};


