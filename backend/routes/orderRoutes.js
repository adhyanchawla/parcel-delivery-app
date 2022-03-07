const express = require('express');

const router = express.Router();

const { body } = require('express-validator');

const orderController = require('./../controllers/orderController');

const decodedToken = require('./../middlewares/decodeToken');

router.get('/getOrders', decodedToken, orderController.fetchAll);

router.post('/postOrder', decodedToken, orderController.postOrder);

router.post('/estimate-price', decodedToken, orderController.getEstimatePrice);

router.get('/order-details/:id', decodedToken, orderController.orderDetails);

// router.get('/:id', orderController.getOrder);

// router.get('/:id/payment', orderController.payment);

module.exports = router;