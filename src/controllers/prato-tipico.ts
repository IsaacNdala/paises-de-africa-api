import { RequestHandler } from 'express';
import PratoTipico, { IPratoTipico } from '../models/prato-tipico';
import { validationResult } from 'express-validator';

export const createPratoTipico: RequestHandler = async (req, res, next) => {
  try {
    const { designacao, paisId, userId } = req.body;
    const file = req.file;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const obj: { 
      designacao: any,
      paisId: any,
      userId: any,
      imagemURL?: string
    } = { designacao, paisId, userId };

    if(file) {
      obj.imagemURL = file.filename;
    }

    const pratoTipico = await PratoTipico.create(obj);

    res.status(201).json({ msg: 'Cadastrado com sucesso', pratoTipico });
  
  } catch (error) {
    next(error);
  }
};

export const getPratoTipicos: RequestHandler = async (req, res, next) => {
  try {
    const pratoTipico = await PratoTipico.findAll();

    res.status(200).json({ msg: 'Sucesso', pratoTipico });
  } catch (error) {
    next(error);
  }
};

export const getPratoTipico: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pratoTipico = await PratoTipico.findByPk(id);

    if(!pratoTipico) {
      const error: IError = new Error('Prato não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ msg: 'Sucesso', pratoTipico });
  } catch (error) {
    next(error);
  }
};


export const editPratoTipico: RequestHandler = async (req, res, next) => {
  try {
    const { designacao, paisId, pratoTipicoId } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const pratoTipico = await PratoTipico.findByPk(pratoTipicoId);

    if(!pratoTipico) {
      const error: IError = new Error('Prato não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    pratoTipico.designacao = designacao;
    pratoTipico.paisId = paisId;

    res.status(201).json({ msg: 'Editado com sucesso', pratoTipico });
  } catch (error) {
    next(error);
  }
};

export const deletePratoTipico: RequestHandler = async (req, res, next) => {
  try {
    const { pratoTipicoId } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const pratoTipico = await PratoTipico.findByPk(pratoTipicoId);

    if(!pratoTipico) {
      const error: IError = new Error('Prato não encontrada!');
      error.statusCode = 422;
      throw error;
    }

    await pratoTipico.destroy();

    res.status(204).json({ msg: 'Deletado com sucesso', pratoTipico });
  } catch (error) {
    next(error);
  }
};


