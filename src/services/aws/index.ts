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
        createTicket(id, path, (doc,numDoc) => {
            Upload({ Bucket: "aws-samishop-tienda", Key: `punto-venta-3196/ticket/demo-${numDoc}.pdf`, file: doc })
                .then(res => {
                    console.log("upload", res)
                }).catch(err => {
                    /*fs.unlink(path, function (err) {
                        if (err) throw err;
                        console.log('File deleted!');
                    });*/
                })
        })
    });
}
const Upload = async ({ Bucket, Key, file }) => {
    console.log(file);
    const params = {
        Bucket: Bucket,
        Key: Key,
        Body: file,
        contentType: 'application/pdf'
    };
    s3.upload(params, function (s3Err, data) {
        if (s3Err) throw s3Err
        console.log(`File uploaded successfully at ${data.Location}`)
    });
}
export { TicketUpload }