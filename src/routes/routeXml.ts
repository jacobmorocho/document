import express from 'express';
import { Auth } from '../middlewares/auth';
import { xmlController } from '../controller/xmlController';
const routeXml = express.Router();
routeXml.get('/dowload/:id', xmlController().dowload);


export { routeXml }