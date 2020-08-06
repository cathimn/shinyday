const router = require('express').Router();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const { accessKeyId, secretAccessKey, region } = require('../.././config/index');

AWS.config.update({
    region,
    accessKeyId,
    secretAccessKey,
});

const s3 = new AWS.S3();

const fileUpload = function upload(directory) {
    return multer({
        limits: { fileSize: (5 * 1000 * 1000) },
        storage: multerS3({
            s3: s3,
            bucket: 'shinyday',
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            key: function (_req, file, cb) {
                let combinedName = directory + file.originalname;
                cb(null, combinedName)
            },
        })
    })
}

router.post('/users/avatar', fileUpload("users/").single("file"), (req, res) => {
    return res.json({ imageUrl: req.file.location, message: "Success!" })
});

module.exports = router;