const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const User = require('./../models/userModel');

const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const userAddressController = require()

router.get('/', userAddressController.fetchProfile);

router.post('/signup', 
[
    body('name').trim().notEmpty(),
    body('email').isEmail().withMessage('Please Enter a valid Email')
    .custom(async (email) => {
        const user = await User.find(email);
        if(user[0].length > 0) {
            return Promise.reject('Email address already exists!');
        }
    })
    .normalizeEmail(), 
    body('password').trim().isLength({ min: 8 })
], authController.signup );

router.post('/login', authController.login);


// router
//     .route('/')
//     .get(userController.getAllUsers)
//     .post(userController.createUser);

// router
//     .route('/:id')
//     .get(userController.getUser);

module.exports = router;    
