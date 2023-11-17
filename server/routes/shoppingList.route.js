
import express from 'express';
import { createShoppingList, getShoppingListByShopper } from '../controllers/ShoppingList.controller.js';

const router = express.Router();


router.post('/create', createShoppingList);

router.get('/:shopperId', getShoppingListByShopper);

export default router;
