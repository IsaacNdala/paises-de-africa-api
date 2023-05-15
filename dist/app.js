"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const compression_1 = __importDefault(require("compression"));
const db_1 = __importDefault(require("./database/db"));
const api_1 = __importDefault(require("./routes/api"));
const colonia_1 = __importDefault(require("./models/colonia"));
const pais_1 = __importDefault(require("./models/pais"));
const regiao_1 = __importDefault(require("./models/regiao"));
const user_1 = __importDefault(require("./models/user"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3030;
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use('/docs', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use(body_parser_1.default.json());
app.use(api_1.default);
app.get('/', (req, res, next) => {
    res.send('<h1>Bem vindo a Países de África</h1>');
});
pais_1.default.belongsTo(regiao_1.default, { foreignKey: 'regiaoId' });
pais_1.default.belongsTo(colonia_1.default, { foreignKey: 'coloniaId' });
pais_1.default.belongsTo(user_1.default), { foreignKey: 'userId' };
// MiddleWare de Erro
app.use((error, req, res, next) => {
    if (!error.statusCode)
        error.statusCode = 500;
    res.status(error.statusCode).json({ message: error.message });
});
db_1.default
    // .sync({force: true})
    .sync()
    .then((result) => {
    app.listen(port, () => {
        console.log(`
        🚀  Servidor rodando!
        🔉  Ouvindo na porta ${port}
        📭  Requisição em http://localhost:${port}
      `);
    });
})
    .catch((err) => console.log(err));
