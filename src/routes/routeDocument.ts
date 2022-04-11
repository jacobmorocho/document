
import express from 'express';
import { Auth } from '../middlewares/auth';
import { documentController } from '../controller/documentController';

const routeDocument = express.Router();
routeDocument.get('/list', Auth, documentController().list);
routeDocument.post("/add", Auth, documentController().add);
routeDocument.get("/serach", Auth, documentController().serach);
routeDocument.delete("/delete", Auth, documentController().delete);
routeDocument.put("/update/:id", Auth, documentController().update)
export { routeDocument }
