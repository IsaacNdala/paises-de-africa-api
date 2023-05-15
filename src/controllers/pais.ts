import { RequestHandler } from 'express';
import Pais, { IPais } from '../models/pais';
import { validationResult } from 'express-validator';
import Regiao from '../models/regiao';
import Colonia from '../models/colonia';
import User from '../models/user';

export const createPais: RequestHandler = async (req, res, next) => {
  try {
    const {
      nome,
      capital,
      linguaOficial,
      presidente,
      dataIndependencia,
      regiaoId,
      moeda,
      coloniaId,
      userId,
    } = req.body;
    const file = req.file;
    const errors = validationResult(req);

    if (!file) {
      const error: IError = new Error('Carregue a imagem da bandeira!');
      error.statusCode = 422;
      throw error;
    }

    if (!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const foundPais = await Pais.findOne({ where: { nome: nome } });

    if (foundPais) {
      const error: IError = new Error('País já existe!');
      error.statusCode = 422;
      throw error;
    }

    const pais = await Pais.create({
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
  } catch (error) {
    next(error);
  }
};

export const getPaises: RequestHandler = async (req, res, next) => {
  try {
    const paises = await Pais.findAll({
      include: [{ model: Regiao }, { model: Colonia }, { model: User }],
    });

    res.status(200).json({ msg: 'Sucesso', paises });
  } catch (error) {
    next(error);
  }
};

export const getPais: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pais = await Pais.findOne({
      where: { id: id },
      include: [{ model: Regiao }, { model: Colonia }, { model: User }],
    });

    if (!pais) {
      const error: IError = new Error('País não encontrado!');
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ msg: 'Sucesso', pais });
  } catch (error) {
    next(error);
  }
};

export const editPais: RequestHandler = async (req, res, next) => {
  try {
    const {
      paisId,
      nome,
      capital,
      linguaOficial,
      presidente,
      dataIndependencia,
      regiaoId,
      moeda,
      coloniaId,
      userId,
    } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const pais = await Pais.findByPk(paisId);

    if (!pais) {
      const error: IError = new Error('País não encontrado!');
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
  } catch (error) {
    next(error);
  }
};

export const deletePais: RequestHandler = async (req, res, next) => {
  try {
    const { paisId } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error: IError = new Error(errors.array()[0].msg);
      error.statusCode = 422;
      throw error;
    }

    const pais = await Pais.findByPk(paisId);

    if (!pais) {
      const error: IError = new Error('País não encontrado!');
      error.statusCode = 422;
      throw error;
    }

    await pais.destroy();

    res.status(204).json({ msg: 'Deletado com sucesso', pais });
  } catch (error) {
    next(error);
  }
};
