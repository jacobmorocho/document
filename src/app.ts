import express from 'express';
import 'dotenv/config';
import { router } from './routes/routeDocument';
import expressListRoutes from 'express-list-routes';
import listEndpoints from 'express-list-endpoints'
import { connectToDatabase } from './db';
import bodyParser  from 'body-parser';
connectToDatabase();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log(listEndpoints(app));
    return console.log(`server is listening on ${port}`);
});
