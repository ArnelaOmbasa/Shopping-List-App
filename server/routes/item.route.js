import express from 'express';
import { getAllItems, createItem } from '../controllers/Item.controller.js';

const router = express.Router();

router.get('/', getAllItems);


router.post('/create', createItem);

export default router;
