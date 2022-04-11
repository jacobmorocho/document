import express from 'express';
import { Auth } from '../middlewares/auth';
import { awsController } from '../controller/awsController';
const routeraws = express.Router();
routeraws.get('/dowload', Auth, awsController().dowload);
routeraws.post('/upload', Auth, awsController().upload);

export {routeraws}