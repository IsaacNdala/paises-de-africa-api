"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'pa_' + (0, crypto_1.randomBytes)(12).toString('hex') + path_1.default.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        const error = new Error(`O arquivo '${file.originalname}' não é suportado!`);
        error.statusCode = 422;
        cb(error);
    }
};
exports.upload = (0, multer_1.default)({
    // limits: {
    //   fileSize: 1024 * 1024 * 10, // Tamanho máximo 10MB
    // },
    storage: storage,
    fileFilter: fileFilter
});
