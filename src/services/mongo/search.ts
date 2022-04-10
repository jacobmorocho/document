import { CompetitionModel } from "../../schema/documentSchema";

const Search = () => {

    const Correlative = async (query) => {
        const order = await CompetitionModel.find(query).sort({ correlativo: -1 }).limit(1);;
        return order;
    }
    const All = async (body) => {

        let query = {};
        if (body._id) {
            query['_id'] = body._id;
        }

        if (body.tipoOperacion) {
            query['tipoOperacion'] = body.tipoOperacion;
        }

        if (body.tipoDoc) {
            query['tipoDoc'] = body.tipoDoc;
        }
        if (body.serie) {
            query['serie'] = body.serie;
        }
        if (body.tipoMoneda) {
            query['tipoMoneda'] = body.tipoMoneda;
        }
        if (body.idDocument) {
            query['idDocument'] = body.idDocument;
        }
        if (body.client) {
            if (body.client.ruc) {
                query['client.ruc'] = body.client.ruc;
            }
            if (body.client.razonSocial) {
                query['client.razonSocial'] = body.client.razonSocial;
            }
            if (body.client.nombreComercial) {
                query['client.nombreComercial'] = body.client.nombreComercial;
            }
        }

        if (body.company) {
            if (body.company.ruc) {
                query['company.ruc'] = body.company.ruc;
            }
            if (body.client.razonSocial) {
                query['company.razonSocial'] = body.company.razonSocial;
            }
            if (body.client.nombreComercial) {
                query['company.nombreComercial'] = body.company.nombreComercial;
            }
        }
        if (body.minfechaEmision && body.maxfechaEmision) {
            query['fechaEmision'] = {
                '$gte': new Date(new Date(body.minfechaEmision).setHours(0, 0, 0)),
                '$lte': new Date(new Date(body.maxfechaEmision).setHours(23, 59, 59))
            }
        }
        const documents = await CompetitionModel.find(query).sort({ correlativo: -1 }).limit(50).lean();
        return documents;
    }
    return {
        Correlative: Correlative,
        All: All,
    }
}


export { Search }