"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
require("dotenv/config");
const routeDocument_1 = require("./routes/routeDocument");
const routeAws_1 = require("./routes/routeAws");
const express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
const db_1 = require("./db");
const body_parser_1 = __importDefault(require("body-parser"));
(0, db_1.connectToDatabase)();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/api/document', routeDocument_1.routeDocument);
app.use('/api/aws', routeAws_1.routeraws);
app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.log((0, express_list_endpoints_1.default)(app));
    return console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map