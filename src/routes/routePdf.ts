import express from 'express';
import { Auth } from '../middlewares/auth';
import { pdfController } from '../controller/pdfController';
const routerpdf = express.Router();
routerpdf.get('/dowload/voucher/:id', pdfController().voucher);
routerpdf.get('/dowload/ticket/:id', pdfController().ticket);

export { routerpdf }