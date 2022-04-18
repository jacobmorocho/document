import express from 'express';
import { billingController } from '../controller/billingController';
const routebilling = express.Router();
routebilling.get('/invoice/:id', billingController().Invoice().Send);
routebilling.get('/note', billingController().Note().Send);
routebilling.get('/voided', billingController().Voided().Send);
export { routebilling }