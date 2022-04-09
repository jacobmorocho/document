import express from 'express';
import { Search } from '../services/mongo/search';
import { ListDocuents } from '../services/mongo/list';
import { Save } from '../services/mongo/save';
import { Delete } from '../services/mongo/delete';

const router = express.Router();
router.get('', async (req, res) => {
    let response = await ListDocuents(req.body);
    if (response.status)
        res.status(200).json(response.data);
    else
        res.status(500).json(response.data);
});
router.post("/document/add", async (req, res) => {
    try {
        Save(req.body).then(response => res.json({ status: true, message: "successfully" })).catch(error => res.json(error));
    } catch (error) {
        res.json({ status: false, message: error });
    }
})

router.get("/document/serach", async (req, res) => {
    try {
        res.json(await Search().Home(req.body));
    } catch (error) {
        res.json(error);
    }
})

router.delete("/document/delete", async (req, res) => {
    try {
        res.json(Delete(req.body.id))
    } catch (error) {
        res.json(error);
    }

})
export { router }
