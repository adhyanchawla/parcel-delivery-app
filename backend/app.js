const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/database');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

dotenv.config({path: './config.env'});

const userRoutes = require('./routes/userRoutes');

const orderRoutes = require('./routes/orderRoutes');

const fileUploadRoutes = require('./routes/fileUploadRoutes');

const errorController = require('./controllers/error');

const emailRoutes = require('./routes/emailRoutes');


// const userAddressRoutes = require('./routes/userAddressRoutes');

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

//using middlewares to offer basic functionality without errors  
app.set('view engine', 'ejs');
app.use(expressLayouts);  


app.use(express.json());

app.use(bodyParser.json());

// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// middleware dealing with cors errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type: Authorization');
  next();
})

//endpoints created at higher level along with the routes
app.use('/auth', userRoutes);
app.use('/order', orderRoutes);
app.use('/mail', emailRoutes);
// app.use('/userDetails', userAddressRoutes);
app.use('/upload', fileUploadRoutes);


app.use(errorController.get404);

app.use(errorController.get500);


sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

//port setted up 
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
