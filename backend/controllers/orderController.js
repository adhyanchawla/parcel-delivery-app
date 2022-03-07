// not working completely
const { validationResult } = require("express-validator");
const Orders = require("./../models/orderModel");
const UserModel = require("./../models/userModel");

// fetches all the orders from the database
exports.fetchAll = async (req, res, next) => {
  const userId = req.id;
  Orders.findAll({
    where: {
      userId: userId,
    },
  })
    .then((result) => {
      res.status(200).json({ data: result });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error!" });
    });
};

// fetch an order from the database using order id
exports.fetchOrder = async (req, res, next) => {};

// stores the order details from frontend to the database
exports.postOrder = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return;
  }

  const type = req.body.type;
  const weight = req.body.weight;
  const length = req.body.length;
  const width = req.body.width;
  const userId = req.id;
  const alternatePhone = req.body.alternatePhone;
  const pickupAddress = req.body.pickupAddress;
  const dropAddress = req.body.dropAddress;

  if (
    !userId ||
    !type ||
    !length ||
    !width ||
    !alternatePhone ||
    !pickupAddress ||
    !dropAddress ||
    !weight
  ) {
    // console.log(
    //   userId,
    //   type,
    //   length,
    //   width,
    //   alternatePhone,
    //   dropAddress,
    //   weight
    // );
    return res.status(400).json({ error: "Invalid Form Paramters" });
  }

  Orders.create({
    userId: userId,
    type: type,
    weight: weight,
    alternatePhone: alternatePhone,
    length: length,
    width: width,
    pickupAddress: pickupAddress,
    dropAddress: dropAddress,
    orderStage: 0,
  })
    .then((result) => {
      res.status(201).json({
        message: "New Order Created! Payment to be done",
      });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error!" });
    });
};

exports.getEstimatePrice = (req, res, next) => {};

exports.orderDetails = (req, res, next) => {
  const orderId = req.params.id;
  Orders.findByPk(orderId)
    .then((result) => {
      res.status(200).json({ data: result.dataValues });
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal Server Error!" });
    });
};
