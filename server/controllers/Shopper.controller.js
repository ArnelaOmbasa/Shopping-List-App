import Shopper from '../models/Shopper.model.js';

export const getAllShoppers = async (req, res) => {
  try {
    const shoppers = await Shopper.find();
    res.status(200).send(shoppers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const createShopper = async (req, res) => {
  try {
    const { name } = req.body;

    const newShopper = new Shopper({ name });
    await newShopper.save();

    res.status(201).send(newShopper);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
