import Express from 'express';
import cors from 'cors';
import router from './routes';
import model from './seedCreator';

const app = Express();
app.use(Express.json());
app.use(cors());

app.get('/health', (_req, res) =>
  res.status(200).send({ message: `Server online ${process.env.PORT || 3001}` })
);

app.use(router);

model.readAllTables({ logTables: true, allSeeds: false, seedFile: false });
export default app;
