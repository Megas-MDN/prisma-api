import Express, { Request, Response } from 'express';
import cors from 'cors';

const app = Express();
app.use(Express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  return res.send('Express Typescript on Vercel');
});

app.get('/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓');
});

export default app;
