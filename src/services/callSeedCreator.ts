import model from '../models/seedCreator';

const callSeedCreator = async () => {
  const item = await model.readAllTables();
  return item;
};

export default { callSeedCreator };
