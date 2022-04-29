import { SaveDocument } from "../services/mongo/save";
import { ListDocuents } from "../services/mongo/list";
import { SearchDocument } from "../services/mongo/search";
import { Delete } from "../services/mongo/delete";
import { DocumentUpdate } from "../services/mongo/update";
import { TicketUpload } from "../services/aws";

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
            let response = await SaveDocument(req.body);
            let aws = await TicketUpload(response.data.id);
            res.json(response);
        } catch (error) {
            res.json({ status: false, message: error });
        }
    }
    const Serach = async (req, res) => {
        try {
            res.json(await SearchDocument().All(req.body));
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
        const { id: _id } = req.params;
        const paylod = req.body;
        DocumentUpdate().Update({ _id, paylod }, (err, updatedDocument) => {
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