import { Save } from "../services/mongo/save";
import { ListDocuents } from "../services/mongo/list";
import { Search } from "../services/mongo/search";
import { Delete } from "../services/mongo/delete";
import { Update } from "../services/mongo/update";

const documentController = () => {
    const List = async (req, res) => {
        let response = await ListDocuents(req.body);
        if (response.status)
            res.status(200).json(response.data);
        else
            res.status(500).json(response.data);
    }
    const Add = async (req, res) => {
        try {
            Save(req.body).then(response => res.json({ status: true, message: "successfully" })).catch(error => res.json(error));
        } catch (error) {
            res.json({ status: false, message: error });
        }
    }
    const Serach = async (req, res) => {
        try {
            console.log(req.body);
            res.json(await Search().All(req.body));
        } catch (error) {
            res.json(error);
        }
    }
    const Deleted = (req, res) => {
        try {
            res.json(Delete(req.body.id))
        } catch (error) {
            res.json(error);
        }
    }
    const Updated = (req, res) => {
        console.log(req.params);
        const { id: _id } = req.params;
        const paylod = req.body;
        Update({ _id, paylod }, (err, updatedDocument) => {
            if (err) {
                res.json({ success: false, msg: err });
            } else {
                res.json({ success: true, message: 'successfully updated' });
            }
        })
    }
    return {
        list: List,
        add: Add,
        serach: Serach,
        delete: Deleted,
        update: Updated
    }
}
export { documentController }