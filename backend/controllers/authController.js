const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs"); // to store the password in encrypted form in the database

// const accountSid = "AC270a56d18b4814815b30c3b1f51b66fa";
// const authToken = "[AuthToken]";
// const client = require("twilio")(accountSid, authToken);

const jwt = require("jsonwebtoken"); // creates a web token to ensure that the right user is logged in

const users = require("./../models/userModel");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((userObject) => {
      console.log(userObject);
      if (userObject) {
        res.status(400).json({ message: "Email already in use" });
      } else {
        users
          .create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          })
          .then((result) => {
            res.status(201).json({
              message: "New user has been registered",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: err,
            });
          });
      }
    });
};


exports.login = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }

  users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((userObject) => {
      if (userObject) {
        if (userObject.password === req.body.password) {
          let isProfileComplete = true;
          if (
            !userObject.phone ||
            !userObject.city ||
            !userObject.country ||
            !userObject.state ||
            !userObject.pin
          ) {
            isProfileComplete = false;
          }
          const token = jwt.sign(
            {
              id: userObject.id,
              email: userObject.email,
              isVerified: userObject.isVerified,
              isProfileComplete: isProfileComplete,
            },
            "somesupersecretsauce",
            { expiresIn: "1d" }
          );
          res.status(200).json({ token: token });
        } else {
          res.status(401).json({
            message: "Password is wrong!",
          });
        }
      } else {
        res.status(401).json({
          message: "Email is wrong!",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

// posting log in data to database and verify if the email exists in the database
// exports.login = async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   try {
//     const user = await User.find(email); // looks for the email in the database
//     console.log(user);
//     // if no mail matches the entered email
//     if (user[0].length !== 1) {
//       const error = new Error("A user with this email could not be found");
//       error.statusCode = 401;
//       throw error;
//     }

//     const storedUser = user[0][0];
//     // does password match?
//     const isEqual = await bcrypt.compare(password, storedUser.password);

//     client.messages
//       .create({
//          body: 'Your OTP is this',
//          messagingServiceSid: 'MG2aa2a7d8bd0bfa65477076975ba4814d',
//          to: '+919646003078'
//        })
//       .then(message => console.log(message.sid))
//       .done();

//     //if entered pswd is different
//     if (!isEqual) {
//       const error = new Error("Wrong Password");
//       error.statusCode = 401;
//       throw error;
//     }

//     // if everything successfully happens, a token is issued
//     const token = jwt.sign(
//       {
//         email: storedUser.email,
//         userId: storedUser.id,
//       },
//       "secretfortoken",
//       { expiresIn: "1h" }
//     );
//     // sending the user id and the token as a response
//     res.status(200).json({ token, userId: storedUser.id });
//   } catch (err) {
//     if (!err.statusCode) {
//       err.statusCode = 500;
//     }
//     next(err);
//   }
//   // next();
// };

exports.update = (req, res, next) => {

  const id = req.id;
  const phone = req.body.phone ? req.body.phone : null;
  const city = req.body.city ? req.body.city : null;
  const state = req.body.state ? req.body.state : null;
  const country = req.body.country ? req.body.country : null;
  const pin = req.body.pin ? req.body.pin : null;

  users.findByPk(id)
  .then((userObject) => {
    if(userObject) {
      users
        .update(
          {
            phone: phone,
            country: country,
            state: state,
            city: city,
            pin: pin
          },
          {
            where: {
              id: id,
            },
          }
        )
        .then((result) => {
          res.status(200).json({ message: "User Profile Updated!"})
        })
        .catch((err) => {
          res.status(200).json({ message: "Internal Server error!"});
        });
    } else {
      res.status(500).json({ message: 'Incorrect User ID given!'});
    }
  })
  .catch((err) => {
    res.status(500).json({ data: "Internal Server Error!" });
  })
};

exports.verifyUser = (req, res, next) => {
  const userId = req.id;
  const userOTP = req.body.userOTP;
  users
    .findByPk(userId)
    .then((userObject) => {
      if (userObject) {
        if (userObject.dataValues.OTP === userOTP) {
          users
            .update(
              { isVerified: true },
              {
                where: {
                  id: userId,
                },
              }
            )
            .then((result) => {
              res.status(200).json({ data: "User Verified" });
            })
            .catch((err) => {
              res.status(500).json({ data: "Internal server error." });
            });
        } else {
          res
            .status(400)
            .json({ data: "Verification Failed, Wrong OTP Given." });
        }
      } else {
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};

exports.getUserData = (req, res, next) => {
  const id = req.id;
  users
    .findOne({
      attributes: {
        exclude: [
          "password",
          "isVerified",
          "email",
          "OTP",
          "createdAt",
          "updatedAt",
          "id",
        ],
      },
      where: {
        id: id,
      },
    })
    .then((userObject) => {
      if (userObject) {
        res.status(200).json({ data: userObject });
      } else {
        res.status(400).json({ data: "Incorrect User ID Given." });
      }
    })
    .catch((err) => {
      res.status(500).json({ data: "Internal server error." });
    });
};
