"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketUpload = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const ticket_1 = require("../../services/voucher/ticket");
const tmp_1 = __importDefault(require("tmp"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: "AKIAXW6DZI6HRZBXGMIQ",
    secretAccessKey: "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"
});
console.log(s3);
const TicketUpload = (id) => {
    tmp_1.default.file(function (err, path, fd, cleanupCallback) {
        if (err)
            throw err;
        (0, ticket_1.createTicket)(id, path, (doc, numDoc) => {
            Upload({ Bucket: "aws-samishop-tienda", Key: `punto-venta-3196/ticket/demo-${numDoc}.pdf`, file: doc })
                .then(res => {
                console.log("upload", res);
            }).catch(err => {
                /*fs.unlink(path, function (err) {
                    if (err) throw err;
                    console.log('File deleted!');
                });*/
            });
        });
    });
};
exports.TicketUpload = TicketUpload;
const Upload = async ({ Bucket, Key, file }) => {
    console.log(file);
    const params = {
        Bucket: Bucket,
        Key: Key,
        Body: file,
        contentType: 'application/pdf'
    };
    s3.upload(params, function (s3Err, data) {
        if (s3Err)
            throw s3Err;
        console.log(`File uploaded successfully at ${data.Location}`);
    });
};
//# sourceMappingURL=index.js.map