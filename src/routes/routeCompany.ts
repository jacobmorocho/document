import express from 'express';
import { Auth } from '../middlewares/auth';
import { companyController } from '../controller/companyController';
const routerCompany = express.Router();
routerCompany.post('/save', companyController().save);

export { routerCompany }