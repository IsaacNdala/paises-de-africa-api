import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import compression from 'compression';
import db from './database/db';
import apiRoutes from './routes/api';
import Colonia from './models/colonia';
import Pais from './models/pais';
import Regiao from './models/regiao';
import User from './models/user';

const app = express();

const port = process.env.PORT || 3030;

app.use(compression());
app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use('/docs', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());

app.use(apiRoutes);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('<h1>Bem vindo a Países de África</h1>')
});

Pais.belongsTo(Regiao, { foreignKey: 'regiaoId' })
Pais.belongsTo(Colonia, { foreignKey: 'coloniaId' })
Pais.belongsTo(User), { foreignKey: 'userId' };

// MiddleWare de Erro
app.use((error: IError, req: Request, res: Response, next: NextFunction) => {
  if (!error.statusCode) error.statusCode = 500;
  res.status(error.statusCode!).json({ message: error.message });
});

db
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
