import express from 'express';
import { getAllShoppers, createShopper } from '../controllers/Shopper.controller.js';

const router = express.Router();


router.get('/', getAllShoppers);


router.post('/create', createShopper);

export default router;
