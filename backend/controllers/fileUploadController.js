
// uploading a file stores the file in the public folder
exports.fileUpload = (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    try {
        res.status(200).json({
                status: 'success'
            })
        } catch(err) {
            
            if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                response: 'No file uploaded',
                message: err,
            });
        }
    }
    next();
}

