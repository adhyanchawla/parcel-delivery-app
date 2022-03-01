const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const orderController = require('./../controllers/orderController');

router.get('/getOrders', orderController.fetchAll);

router.post('/postOrder', [
    body('type').trim().notEmpty(),
    body('length').trim(),
    body('width').trim(),
    body('user').trim().notEmpty(),
    body('alternateNo').trim(),
    body('pickupAddress').trim(),
    body('dropAddress').trim(),
], orderController.postOrder);

// router.get('/:id', orderController.getOrder);

// router.get('/:id/payment', orderController.payment);

module.exports = router;