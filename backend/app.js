const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');

dotenv.config({path: './config.env'});

const userRoutes = require('./routes/userRoutes');

const orderRoutes = require('./routes/orderRoutes');

const fileUploadRoutes = require('./routes/fileUploadRoutes');

const errorController = require('./controllers/error');

const app = express();

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

//using middlewares to offer basic functionality without errors  
app.set('view engine', 'ejs');
app.use(expressLayouts);  

app.use(cors(corsOpts));

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

// dealing with cors errors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type: Authorization');
  next();
})

//endpoints created at higher level along with the routes
app.use('/auth', userRoutes);
app.use('/order', orderRoutes);
app.use('/upload', fileUploadRoutes);
// app.use('/profile', userAddressRoutes);

app.use(errorController.get404);

app.use(errorController.get500);


//port setted up 
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
