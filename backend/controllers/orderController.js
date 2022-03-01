// not working completely
const { validationResult } = require("express-validator");

const Order = require("./../models/orderModel");

const UserModel = require('./../models/userModel');

// fetches all the orders from the database
exports.fetchAll = async (req, res, next) => {
    try {
        const [orders] = await Order.fetchAll();
        res.status(200).json({
            orders
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    }
}

// fetch an order from the database using order id
exports.fetchOrder = async (req, res, next) => {
    try {
        const order = await Order.fetchOrder(req.params.id);
        res.status(200).json({
            status: 'success',
            order,
        })
    } catch(err) {
        if (!err.statusCode) {
            err.statusCode = 500;
          }
        next(err);
    }
    next();
}

// stores the order details from frontend to the database
exports.postOrder = async (req, res, next) => {
  
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return;
  }

  //const order = await Order.fetchAll();
  // let id = 0;
  // if(order[0].length === 0) {
  //   id = 1;
  // } else {
  //   id = order[0].length + 1;
  // }

  const type = req.body.type;
  const weight = req.body.weight;
  const length = req.body.length;
  const width = req.body.width;
  const user = req.body.user;
  const alternateNo = req.body.alternateNo;
  const pickupAddress = req.body.pickupAddress;
  const dropAddress = req.body.dropAddress;

  // console.log(orderType, weight, length, width, alternateNo, user, pickupAddress, dropAddress);

  try {
    const orderDetails = {
      type,
      weight,
      length,
      width,
      user,
      alternateNo,
      pickupAddress,
      dropAddress,
    };

    // if(!pickupAddress || !dropAddress || !length || !width || !weight || !user || !alternateNo || !orderType) {
    //   return;
    // }

    const result = await Order.save(orderDetails); //store into the database

    res.status(201).json({
      status: "success",
      message: "Order in progress!",
    });
  } catch (err) {
    //handle error
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // next();
};
