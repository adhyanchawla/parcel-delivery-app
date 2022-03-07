const express = require('express');

const { body } = require('express-validator');

const decodedToken = require('./../middlewares/decodeToken');

const router = express.Router();
//useless secure apps turn on
const User = require('./../models/userModel');
const { check } = require('express-validator');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');

router.post('/signup', 
[
    body('name').trim().notEmpty(),
    body('email').isEmail().withMessage('Please Enter a valid Email')
    .normalizeEmail([{ all_lowercase: true }]),
    body('password').trim().isLength({ min: 8 })
], authController.signup );

router.post('/login', 
[
    check("password").not().isEmpty().withMessage("Empty password recieved"),
    check("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail([{ all_lowercase: true }]),
  ],
authController.login);

router.post("/verify-user", decodedToken, authController.verifyUser);

router.post('/updateUser', decodedToken, authController.update);

router.get('/get-user-data', decodedToken, authController.getUserData);


module.exports = router;    
