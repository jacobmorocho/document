import express from 'express';
import { voidedController } from '../controller/voidedController';
const routeVoided = express.Router();
routeVoided.post('/search', voidedController().search);

export { routeVoided }
