import { checkSchema } from 'express-validator';

// Pais
export const createPais = checkSchema({
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
export const createRegiao = checkSchema({
  designacao: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo designacao é obrigatório!',
  },
});

export const editRegiao = checkSchema({
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

export const deleteRegiao = checkSchema({
  regiaoId: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo regiaoId é obrigatório!',
  }
});
// Fim Regiao

// Colonia
export const createColonias = checkSchema({
  designacao: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo designacao é obrigatório!',
  },
});

export const editColonia = checkSchema({
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

export const deleteColonia = checkSchema({
  coloniaId: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo coloniaId é obrigatório!',
  }
});
// Fim Colonia

// Auth
export const createUser = checkSchema({
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

export const login = checkSchema({
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

// PratoTipico
export const createPratoTipico = checkSchema({
  designacao: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo designacao é obrigatório!',
  },
  paisId: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo paisId é obrigatório!',
  },
  userId: {
    notEmpty: true,
    trim: true,
    errorMessage: 'O campo userId é obrigatório!',
  },
  imageURl: {
    trim: true,
  },
});
// Fim PratoTipico
