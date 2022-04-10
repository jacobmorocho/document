
import express from 'express';
import { Search } from '../services/mongo/search';
import { ListDocuents } from '../services/mongo/list';
import { Save } from '../services/mongo/save';
import { Delete } from '../services/mongo/delete';
import { Update } from '../services/mongo/update';
import { Auth } from 'middlewares/auth';

const router = express.Router();
router.get('/list', Auth, async (req, res) => {
    let response = await ListDocuents(req.body);
    if (response.status)
        res.status(200).json(response.data);
    else
        res.status(500).json(response.data);
});
router.post("/document/add", Auth, async (req, res) => {
    try {
        Save(req.body).then(response => res.json({ status: true, message: "successfully" })).catch(error => res.json(error));
    } catch (error) {
        res.json({ status: false, message: error });
    }
});

router.get("/document/serach", Auth, async (req, res) => {
    try {
        console.log(req.body);
        res.json(await Search().All(req.body));
    } catch (error) {
        res.json(error);
    }
});
router.delete("/document/delete", Auth, async (req, res) => {
    try {
        res.json(Delete(req.body.id))
    } catch (error) {
        res.json(error);
    }
});
router.put("/document/update/:id", Auth, async (req, res) => {
    const { id: _id } = req.params;
    const paylod = req.body;
    Update({ _id, paylod }, (err, updatedDocument) => {
        if (err) {
            res.json({ paylod, success: false, msg: err });
        } else {
            res.json({ success: true, message: 'successfully updated' });
        }
    })
})
export { router }
