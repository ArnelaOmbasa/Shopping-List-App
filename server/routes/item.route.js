import express from 'express';
import { getAllItems } from '../controllers/Item.controller.js';

const router = express.Router();

router.get('/', getAllItems);

export default router;
