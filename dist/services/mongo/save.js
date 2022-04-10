"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Save = void 0;
const documentSchema_1 = require("../../schema/documentSchema");
const documentvalidate_1 = require("../../services/validate/documentvalidate");
const search_1 = require("./search");
const Save = async (body) => {
    return new Promise((resolve, reject) => {
        let response = (0, documentvalidate_1.documentvalidate)(body);
        if (!response.status) {
            reject(response);
        }
        else {
            var document = new documentSchema_1.CompetitionModel(body);
            let query = {};
            query['serie'] = document.serie;
            query['company.ruc'] = document.company.ruc;
            (0, search_1.Search)().Correlative(query).then((models) => {
                if (models.length <= 0) {
                    document.correlativo = 1;
                }
                else {
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
};
exports.Save = Save;
//# sourceMappingURL=save.js.map