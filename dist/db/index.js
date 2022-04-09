"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = async () => {
    try {
        let url = process.env.MONGODB_URI || "";
        const db = await mongoose_1.default.connect(url, {});
        console.log("MongoDB connected to", db.connection.host);
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=index.js.map