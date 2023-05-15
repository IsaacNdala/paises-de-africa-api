import { RequestHandler } from 'express';
import Regiao, { IRegiao } from '../models/regiao';
import { validationResult } from 'express-validator';

export const createRegiao: RequestHandler = async (req, res, next) => {
  try {
    const { designacao } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const regiao = await Regiao.create({ designacao });

    res.status(201).json({ msg: 'Cadastrado com sucesso', regiao });
  
  } catch (error) {
    next(error);
  }
};

export const getRegioes: RequestHandler = async (req, res, next) => {
  try {
    const regioes = await Regiao.findAll();

    res.status(200).json({ msg: 'Sucesso', regioes });
  } catch (error) {
    next(error);
  }
};

export const getRegiao: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const regiao = await Regiao.findByPk(id);

    if(!regiao) {
      const error: IError = new Error('Região não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ msg: 'Sucesso', regiao });
  } catch (error) {
    next(error);
  }
};


export const editRegiao: RequestHandler = async (req, res, next) => {
  try {
    const { regiaoId, designacao } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const regiao = await Regiao.findByPk(regiaoId);

    if(!regiao) {
      const error: IError = new Error('Região não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    regiao.designacao = designacao;

    res.status(201).json({ msg: 'Editado com sucesso', regiao });
  } catch (error) {
    next(error);
  }
};

export const deleteRegiao: RequestHandler = async (req, res, next) => {
  try {
    const { regiaoId } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const regiao = await Regiao.findByPk(regiaoId);

    if(!regiao) {
      const error: IError = new Error('Região não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    await regiao.destroy();

    res.status(204).json({ msg: 'Deletado com sucesso', regiao });
  } catch (error) {
    next(error);
  }
};


