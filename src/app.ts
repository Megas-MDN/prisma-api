import Express from 'express';
import cors from 'cors';
import router from './routes';
import { readAllTables } from './seedCreator';

const app = Express();
app.use(Express.json());
app.use(cors());

app.get('/health', (_req, res) =>
  res.status(200).send({ message: `Server online ${process.env.PORT || 3001}` })
);

app.use(router);

readAllTables({
  logTables: true,
  allSeeds: false,
  seedFile: false,
  onlyTables: ['Recomend'], // optional: default []
  // arrFilters: filters, // optional: default []
});
export default app;
