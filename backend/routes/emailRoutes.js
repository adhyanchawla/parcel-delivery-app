const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const emailController = require('./../controllers/emailController');

const auth = require('./../middlewares/decodeToken');


router.post('/send-otp', auth, emailController.sendEmailOtp);

module.exports = router;

