import ShoppingList from '../models/ShoppingList.model.js';
import Shopper from '../models/Shopper.model.js';
import Item from '../models/Item.model.js';

export const createShoppingList = async (req, res) => {
    try {
        const { shopperId, itemIds } = req.body;
    
        // Validate if the shopper exists
        const shopper = await Shopper.findById(shopperId);
        if (!shopper) {
          return res.status(404).send('Shopper not found');
        }
    
        // Validate if the items exist
        const items = await Item.find({ _id: { $in: itemIds } });
        if (items.length !== itemIds.length) {
          return res.status(404).send('One or more items not found');
        }
    
        // Check if the shopper already has a shopping list
        const existingList = await ShoppingList.findOne({ shopper: shopperId });
        if (existingList) {
          return res.status(400).send('Shopper already has a shopping list');
        }
    
        // Check if any of the selected items are already in 3 shopping lists
        const itemsInLists = await ShoppingList.find({ items: { $in: itemIds } });
        for (const itemId of itemIds) {
          const count = itemsInLists.filter(list => list.items.includes(itemId)).length;
          if (count >= 3) {
            return res.status(400).send(`Item with ID ${itemId} is already in 3 shopping lists`);
          }
        }
    
        // Create a new shopping list
        const newShoppingList = new ShoppingList({
          shopper: shopperId,
          items: itemIds,
        });
    
        await newShoppingList.save();
    
        res.status(201).send(newShoppingList);
      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
};

export const getShoppingListByShopper = async (req, res) => {
    try {
        const { shopperId } = req.params;
    
        // Validate if the shopper exists
        const shopper = await Shopper.findById(shopperId);
        if (!shopper) {
          return res.status(404).send('Shopper not found');
        }
    
        // Find and populate the shopping list for the given shopper
        const shoppingList = await ShoppingList.findOne({ shopper: shopperId }).populate('items');
    
        if (!shoppingList) {
          return res.status(404).send('Shopping list not found for the shopper');
        }
    
        res.status(200).send(shoppingList);
      } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
      }
};


