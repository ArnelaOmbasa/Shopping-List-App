
import mongoose from 'mongoose';

const { Schema } = mongoose;

const ShopperSchema = new Schema({
  name: String,
});

const Shopper = mongoose.model('Shopper', ShopperSchema);

export default Shopper;
