import Item from '../models/Item.model.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
