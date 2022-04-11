import express from 'express';
import fileUpload from 'express-fileupload'
import 'dotenv/config';
import { routeDocument } from './routes/routeDocument';
import { routeraws } from './routes/routeAws';
import { routerpdf } from './routes/routePdf';
import listEndpoints from 'express-list-endpoints'
import { connectToDatabase } from './db';
import bodyParser from 'body-parser';
connectToDatabase();
const app = express();
const port = process.env.PORT;
app.use(fileUpload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/document', routeDocument);
app.use('/api/aws', routeraws);
app.use('/api/pdf', routerpdf)
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(listEndpoints(app));
    return console.log(`server is listening on ${port}`);
});
