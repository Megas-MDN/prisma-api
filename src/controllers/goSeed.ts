import { Request, Response } from 'express';
import seed from '../services/callSeedCreator';

const getAllSeeds = async (req: Request, res: Response) => {
  const seedy = await seed.callSeedCreator();
  return res.status(200).send(seedy);
};

export default { getAllSeeds };
