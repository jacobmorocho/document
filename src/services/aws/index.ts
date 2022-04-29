import AWS from 'aws-sdk';
import fs from 'fs';
import { createTicket } from '../../services/voucher/ticket';
import tmp from 'tmp';

const s3 = new AWS.S3({
    accessKeyId: "AKIAXW6DZI6HRZBXGMIQ",
    secretAccessKey: "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"
});
console.log(s3)
const TicketUpload = (id) => {
    tmp.file(function (err, path, fd, cleanupCallback) {
        if (err) throw err;
        createTicket(id, path, (numDoc) => {
            const rs = fs.createReadStream(path);
            Upload({ Bucket: "aws-samishop-tienda", Key: `punto-venta-3196/ticket/demo${numDoc}.pdf`, file: rs })
                .then(res => {
                    console.log("upload", res)
                }).catch(err => {
                    fs.unlink(path, function (err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });
                })
        })
    });
}
const pathKey = (args) => {
    let key = args.join("/")
    const search = '//'
    const replacer = new RegExp(search, 'g')
    key = key.replace(replacer, '/');
    return key;
}
const Upload = async ({ Bucket, Key, file }) => {
    let patchkey = pathKey([Bucket, Key]);
    const params = {
        Bucket: Bucket,
        Key: patchkey,
        Body: JSON.stringify(file, null, 2)
    };
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err)
        }
        if (data) {
            console.log(data)
        }
    });
}
export { TicketUpload }