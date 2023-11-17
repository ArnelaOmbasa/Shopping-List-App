import Item from '../models/Item.model.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).send(items);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }};

  export const createItem = async (req, res) => {
    try {
      const { name } = req.body;
  
      const newItem = new Item({ name });
      await newItem.save();
  
      res.status(201).send(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  };
