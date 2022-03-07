const users = require("../models/userModel");
const { validationResult } = require("express-validator");
const transporter = require("../utils/mail");
const generateOTP = require("../utils/otp");

exports.sendEmailOtp = (req, res, next) => {
  const userId = req.id;
  console.log(userId);
  users
    .findByPk(userId)
    .then((userObject) => {
      const userEmail = userObject.dataValues.email;
      console.log(userEmail);
      if (userObject) {
        const OTP = generateOTP();
        users
          .update(
            { otp: OTP },
            {
              where: {
                id: userId,
              },
            }
          )
          .then((result) => {
            transporter.sendMail({
              to: userEmail,
              subject: "OTP Verification",
              html: `OTP: ${OTP}`,
            });
            res.status(200).json({ data: "OTP Sent" });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log(err);
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};