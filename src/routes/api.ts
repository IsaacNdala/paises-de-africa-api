import { NextFunction, Router, Request, Response } from 'express';
import { upload } from '../util/file';
import * as schema from './validation-schemas';
import * as regiaController from '../controllers/regiao';
import * as coloniaController from '../controllers/colonia';
import * as authController from '../controllers/auth';
import * as paisController from '../controllers/pais';
import * as pratoTipicoController from '../controllers/prato-tipico';

const router = Router();

// Pais
router.post(
  '/pais/create',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('bandeira')(req, res, function (err) {
      if (err) {
        next(err);
      }
      next();
    });
  },
  schema.createPais,
  paisController.createPais,
);

router.get('/paises', paisController.getPaises);

router.get('/pais/:id', paisController.getPais);

router.get('/pais/search/:search', paisController.searchPais);

router.put('/pais/edit', paisController.editPais);

router.delete('/pais/delete', paisController.deletePais);
// Fim Pais

// Regiao
router.get('/regioes', regiaController.getRegioes);

router.get('/regiao/:id', regiaController.getRegiao);

router.post(
  '/regiao/create',
  schema.createRegiao,
  regiaController.createRegiao,
);

router.put('/regiao/edit', schema.editRegiao, regiaController.editRegiao);

router.delete(
  '/regiao/delete',
  schema.deleteRegiao,
  regiaController.deleteRegiao,
);
// Fim Regiao

// Colonia
router.get('/colonias', coloniaController.getColonias);

router.get('/colonia/:id', coloniaController.getColonia);

router.post(
  '/colonia/create',
  schema.createRegiao,
  coloniaController.createColonia,
);

router.put('/colonia/edit', schema.editColonia, coloniaController.editColonia);

router.delete(
  '/colonia/delete',
  schema.deleteColonia,
  coloniaController.deleteColonia,
);
// Fim Colonias

// Auth
router.post(
  '/auth/create-user',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('foto')(req, res, function (err) {
      if (err) {
        next(err);
      }
      next();
    });
  },
  schema.createUser,
  authController.createUser,
);

router.post('/auth/login', schema.login, authController.login);
// Fim Auth

// PratoTipico
router.post(
  '/prato-tipico/create',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('imagem')(req, res, function (err) {
      if (err) {
        next(err);
      }
      next();
    });
  },
  schema.createPratoTipico,
  pratoTipicoController.createPratoTipico,
);
// Fim PratoTipico

export default router;
