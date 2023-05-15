import { RequestHandler } from 'express';
import Colonia, { IColonia } from '../models/colonia';
import { validationResult } from 'express-validator';

export const createColonia: RequestHandler = async (req, res, next) => {
  try {
    const { designacao } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const colonia = await Colonia.create({ designacao });

    res.status(201).json({ msg: 'Cadastrado com sucesso', colonia });
  
  } catch (error) {
    next(error);
  }
};

export const getColonias: RequestHandler = async (req, res, next) => {
  try {
    const colonia = await Colonia.findAll();

    res.status(200).json({ msg: 'Sucesso', colonia });
  } catch (error) {
    next(error);
  }
};

export const getColonia: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const colonia = await Colonia.findByPk(id);

    if(!colonia) {
      const error: IError = new Error('Colónia não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ msg: 'Sucesso', colonia });
  } catch (error) {
    next(error);
  }
};


export const editColonia: RequestHandler = async (req, res, next) => {
  try {
    const { ColoniaId, designacao } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const colonia = await Colonia.findByPk(ColoniaId);

    if(!colonia) {
      const error: IError = new Error('Colónia não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    colonia.designacao = designacao;

    res.status(201).json({ msg: 'Editado com sucesso', colonia });
  } catch (error) {
    next(error);
  }
};

export const deleteColonia: RequestHandler = async (req, res, next) => {
  try {
    const { coloniaId } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const colonia = await Colonia.findByPk(coloniaId);

    if(!colonia) {
      const error: IError = new Error('Colónia não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    await colonia.destroy();

    res.status(204).json({ msg: 'Deletado com sucesso', colonia });
  } catch (error) {
    next(error);
  }
};


