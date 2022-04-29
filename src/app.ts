import express from 'express';
import fileUpload from 'express-fileupload'
import 'dotenv/config';
import { routeDocument } from './routes/routeDocument';
import { routeraws } from './routes/routeAws';
import { routerpdf } from './routes/routePdf';
import listEndpoints from 'express-list-endpoints'
import { connectToDatabase } from './db';
import bodyParser from 'body-parser';
import { routebilling } from './routes/routeBilling';
import { routeXml } from './routes/routeXml'
import {routeVoided } from './routes/routeVoided'
import cors from 'cors';
import { routerCompany } from './routes/routeCompany';
connectToDatabase();
const app = express();
const port = process.env.PORT;

const options: cors.CorsOptions = {
    origin: '*'
};
app.use(cors(options));
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/document', routeDocument);
app.use('/api/aws', routeraws);
app.use('/api/pdf', routerpdf);
app.use('/api/billing', routebilling)
app.use('/api/xml', routeXml)
app.use('/api/voided',routeVoided)
app.use('/api/company',routerCompany)
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(listEndpoints(app));
    return console.log(`server is listening on ${port}`);
});
