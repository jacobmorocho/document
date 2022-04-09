import express from 'express';
import 'dotenv/config';
const app = express();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('hola Mundo!');
});
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});