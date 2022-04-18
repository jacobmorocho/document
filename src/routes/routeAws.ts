import express from 'express';
import { Auth } from '../middlewares/auth';
import { awsController } from '../controller/awsController';
const routeraws = express.Router();
routeraws.get('/dowload',  awsController().dowload);
routeraws.post('/upload',  awsController().upload);

export {routeraws}