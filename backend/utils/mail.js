const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adhyanchawla06@gmail.com',
        pass: 'Adhyan@2701'
    }
});

module.exports = transporter;