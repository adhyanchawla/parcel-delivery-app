const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'adhyanchawla06@gmail.com',
        pass: 'abcd1234'
    }
});

module.exports = transporter;