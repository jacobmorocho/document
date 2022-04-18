
import express from 'express';
import { Auth } from '../middlewares/auth';
import { documentController } from '../controller/documentController';

const routeDocument = express.Router();
routeDocument.get('/list',  documentController().list);
routeDocument.post("/add",  documentController().add);
routeDocument.get("/serach",  documentController().serach);
routeDocument.delete("/delete",  documentController().delete);
routeDocument.put("/update/:id",  documentController().update)
export { routeDocument }
