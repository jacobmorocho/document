import { SaveCompany } from "../services/mongo/save";

const companyController = () => {
    const Save = (req, res) => {
        try {
            SaveCompany(req.body).then(response => {
                if (response && !response.status) {
                    res.json({ status: response.status, response })
                } else {
                    res.json({ status: response.status, message: "successfully" })
                }
            }).catch(error => res.json(error));
        } catch (error) {
            res.json({ status: false, message: error });
        }
    }
    return {
        save: Save
    }
}
export { companyController }