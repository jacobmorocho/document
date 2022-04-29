import express from 'express';
import { billingController } from '../controller/billingController';
const routebilling = express.Router();
routebilling.get('/invoice/:id', billingController().Invoice().Send);
routebilling.post('/note', billingController().Note().Send);
routebilling.post('/voided', billingController().Voided().Send);
export { routebilling }
