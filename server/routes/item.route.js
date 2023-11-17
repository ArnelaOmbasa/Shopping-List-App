import express from 'express';
import { getAllItems } from '../controllers/ItemController.js';

const router = express.Router();

router.get('/', getAllItems);

export default router;
