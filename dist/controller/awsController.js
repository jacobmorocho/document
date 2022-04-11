"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsController = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const awsvalidate_1 = require("../services/validate/awsvalidate");
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
const IsBucket = async (BUCKET_NAME) => {
    try {
        const data = await s3.headBucket({ Bucket: BUCKET_NAME }).promise();
        return true;
    }
    catch (err) {
        return false;
    }
};
const awsController = () => {
    const Dowload = (req, res) => {
        let { status, errors } = (0, awsvalidate_1.awsvalidate)(req.body);
        if (!status) {
            res.json(errors);
        }
        else {
            IsBucket(req.body.backet).then((r) => {
                if (r) {
                    var options = {
                        Bucket: req.body.backet,
                        Key: req.body.key
                    };
                    res.attachment(req.body.name);
                    var fileStream = s3.getObject(options).createReadStream();
                    fileStream.pipe(res);
                }
                else {
                    res.json({ status: false, message: "No Existe backet" });
                }
            }).catch((err) => {
                res.json(err);
            });
        }
    };
    const Upload = async (req, res) => {
        console.log(req.files);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        const body = JSON.parse(JSON.stringify(req.body));
        let { status, errors } = (0, awsvalidate_1.awsvalidate)(body);
        if (!status) {
            res.json(errors);
        }
        else {
            IsBucket(body.backet).then((r) => {
                if (r) {
                    const params = {
                        Bucket: body.backet,
                        Key: body.key,
                        Body: JSON.stringify(req.files.file, null, 2)
                    };
                    s3.upload(params, function (err, data) {
                        if (err) {
                            res.json(err);
                        }
                        res.json(data);
                    });
                }
                else {
                    res.json({ status: false, message: "No Existe backet" });
                }
            }).catch((err) => {
                res.json(err);
            });
        }
    };
    return {
        dowload: Dowload,
        upload: Upload
    };
};
exports.awsController = awsController;
//# sourceMappingURL=awsController.js.map