const express = require('express');

const multer = require('multer');

const router = express.Router();

const fileUploadController = require('./../controllers/fileUploadController');

const upload = multer({ dest: 'public/upload' });


router.post('/', upload.single('sampleFile'), fileUploadController.fileUpload);


module.exports = router;