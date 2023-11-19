
import mongoose from 'mongoose';
import ShoppingList from '../models/ShoppingList.model.js'; // Adjust the path based on your project structure
// Example for getShoppingListByShopper
export const getShoppingListByShopper = async (req, res) => {
  try {
    const shopperId = req.params.shopperId; // Assuming shopperId is obtained from request params

    // Ensure shopperId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shopperId)) {
      return res.status(400).json({ error: 'Invalid Shopper ID' });
    }

    const shoppingList = await ShoppingList.find({ shopper: shopperId }).populate('items');
    res.json(shoppingList);
  } catch (error) {
    console.error('Error fetching shopping list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Example for createShoppingList
export const createShoppingList = async (req, res) => {
  try {
    const { shopperId, itemIds } = req.body;

    // Ensure shopperId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(shopperId)) {
      return res.status(400).json({ error: 'Invalid Shopper ID' });
    }

    // Create a new shopping list
    const shoppingList = new ShoppingList({
      shopper: shopperId,
      items: itemIds,
    });

    await shoppingList.save();
    res.json({ message: 'Shopping list created successfully' });
  } catch (error) {
    console.error('Error creating shopping list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
