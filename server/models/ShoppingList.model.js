import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShoppingListSchema = new Schema({
  shopper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shopper' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
});

const ShoppingList = mongoose.model('ShoppingList', ShoppingListSchema);

export default ShoppingList;
