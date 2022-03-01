const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs"); // to store the password in encrypted form in the database
const jwt = require("jsonwebtoken"); // creates a web token to ensure that the right user is logged in

const User = require("./../models/userModel");

// stores sign up form data to the database 
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return;
  }

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    //encryted to 12 character long pswd
    const hashedPassword = await bcrypt.hash(password, 12);

    const userDetails = {
      name: name,
      email: email,
      password: hashedPassword,
    };

    //store in the database
    const result = await User.save(userDetails);

    res.status(201).json({
      status: "success",
      message: "User registered!",
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

// posting log in data to database and verify if the email exists in the database
exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.find(email); // looks for the email in the database
    console.log(user);
    // if no mail matches the entered email
    if (user[0].length !== 1) {
      const error = new Error("A user with this email could not be found");
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];
    // does password match?
    const isEqual = await bcrypt.compare(password, storedUser.password);

    //if entered pswd is different
    if (!isEqual) {
      const error = new Error("Wrong Password");
      error.statusCode = 401;
      throw error;
    }

    // if everything successfully happens, a token is issued
    const token = jwt.sign(
      {
        email: storedUser.email,
        userId: storedUser.id,
      },
      "secretfortoken",
      { expiresIn: "1h" }
    );
    // sending the user id and the token as a response
    res.status(200).json({ token, userId: storedUser.id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  // next();
};
