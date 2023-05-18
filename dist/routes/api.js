"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_1 = require("../util/file");
const schema = __importStar(require("./validation-schemas"));
const regiaController = __importStar(require("../controllers/regiao"));
const coloniaController = __importStar(require("../controllers/colonia"));
const authController = __importStar(require("../controllers/auth"));
const paisController = __importStar(require("../controllers/pais"));
const pratoTipicoController = __importStar(require("../controllers/prato-tipico"));
const router = (0, express_1.Router)();
// Pais
router.post('/pais/create', (req, res, next) => {
    file_1.upload.single('bandeira')(req, res, function (err) {
        if (err) {
            next(err);
        }
        next();
    });
}, schema.createPais, paisController.createPais);
router.get('/paises', paisController.getPaises);
router.get('/pais/:id', paisController.getPais);
router.get('/pais/search/:search', paisController.searchPais);
router.put('/pais/edit', paisController.editPais);
router.delete('/pais/delete', paisController.deletePais);
// Fim Pais
// Regiao
router.get('/regioes', regiaController.getRegioes);
router.get('/regiao/:id', regiaController.getRegiao);
router.post('/regiao/create', schema.createRegiao, regiaController.createRegiao);
router.put('/regiao/edit', schema.editRegiao, regiaController.editRegiao);
router.delete('/regiao/delete', schema.deleteRegiao, regiaController.deleteRegiao);
// Fim Regiao
// Colonia
router.get('/colonias', coloniaController.getColonias);
router.get('/colonia/:id', coloniaController.getColonia);
router.post('/colonia/create', schema.createRegiao, coloniaController.createColonia);
router.put('/colonia/edit', schema.editColonia, coloniaController.editColonia);
router.delete('/colonia/delete', schema.deleteColonia, coloniaController.deleteColonia);
// Fim Colonias
// Auth
router.post('/auth/create-user', (req, res, next) => {
    file_1.upload.single('foto')(req, res, function (err) {
        if (err) {
            next(err);
        }
        next();
    });
}, schema.createUser, authController.createUser);
router.post('/auth/login', schema.login, authController.login);
// Fim Auth
// PratoTipico
router.post('/prato-tipico/create', (req, res, next) => {
    file_1.upload.single('imagem')(req, res, function (err) {
        if (err) {
            next(err);
        }
        next();
    });
}, schema.createPratoTipico, pratoTipicoController.createPratoTipico);
// Fim PratoTipico
exports.default = router;
