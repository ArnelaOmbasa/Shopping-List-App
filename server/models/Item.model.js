import mongoose from 'mongoose';

const { Schema } = mongoose;

const ItemSchema = new Schema({
  name: String,
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
