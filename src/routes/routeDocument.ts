
import express from 'express';
import { Auth } from '../middlewares/auth';
import { documentController } from '../controller/documentController';

const router = express.Router();
router.get('/list', Auth, documentController().list);
router.post("/document/add", Auth, documentController().add);
router.get("/document/serach", Auth, documentController().serach);
router.delete("/document/delete", Auth, documentController().delete);
router.put("/document/update/:id", Auth, documentController().update)
export { router }
