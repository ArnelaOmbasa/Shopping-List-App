import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import shoppingListRoutes from './routes/shoppingList.route.js';
import itemRoutes from './routes/item.route.js';
import shopperRoutes from './routes/shopper.route.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/shoppingListDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});


app.use('/shoppingList', shoppingListRoutes);
app.use('/item', itemRoutes);
app.use('/shopper', shopperRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
