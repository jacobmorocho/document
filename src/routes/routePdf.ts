import express from 'express';
import { Auth } from '../middlewares/auth';
import { pdfController } from '../controller/pdfController';
const routerpdf = express.Router();
routerpdf.get('/dowload', Auth, pdfController().dowload);


export { routerpdf }