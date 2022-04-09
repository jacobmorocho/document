import { CompetitionModel } from "../../schema/documentSchema";
import { documentvalidate } from "../../services/validate/documentvalidate";
import { Search } from "./search";
const Save = async (body) => {
    return new Promise((resolve, reject) => {
        let response = documentvalidate(body);
        if (!response.status) {
            reject(response);
        } else {
            var document = new CompetitionModel(body);
            let query = {};
            query['serie'] = document.serie;
            query['company.ruc'] = document.company.ruc;
            Search().Correlative(query).then((models) => {
                if (models.length <= 0) {
                    document.correlativo = 1
                } else {
                    document.correlativo = models[0].correlativo + 1;
                }
                document.idDocument = `${document.company.ruc}-${document.serie}-${document.correlativo}`;
                document.save()
                    .then(item => {
                        resolve({
                            status: true,
                            messaje: "successfully",
                            id: item._id
                        });
                    })
                    .catch(err => {

                        reject(err);
                    });
            }).catch(err => {
                reject(err);
            });
        }
    });
}
export { Save }