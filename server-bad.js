const dotenv = require('dotenv');
const express = require("express");
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');
const { auth } = require('express-openid-connect');

// dotenv.load();
dotenv.config()
const config = {
  authRequired: false,
  auth0Logout: true
};
var app = express();

app.use(express.json());

// var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// const express = require('express');

const cors = require("cors");
var bodyParser = require("body-parser");
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 3410;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${PORT}`;
}


app.use(auth(config));


// app.set('views', path.join(__dirname, 'views'));
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const swaggerDoc = require("./swagger.json");

// Added the code below to implement swagger docs with help of ChatGPT
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "CSE341 Sacrament Meeting Program API",
//       version: "1.0.0",
//     },
//     servers: [{ url: process.env.URL }],
//   },
//   swaggerDefinition: swaggerDoc,
//   apis: ["./routes/*.js"], // Use a global pattern to include all route files
// };

// const swaggerSpecs = swaggerJsdoc(options);


// Use CORS middleware
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Serve Swagger documentation
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.static(path.join(__dirname, 'public')));
// IMPORT ALL ROUTES HERE
const hymnsRoutes = require('./routes/hymnsRoutes');

app.use(auth(config));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});



// const navsRoutes = require('./routes/navsRoutes');

// USE ALL ROUTES YOU IMPORTED ABOVE HERE
app.use('/hymns', hymnsRoutes);

// app.use('/hymns', hymnsRoutes);


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

app.get('/profile', (req, res) => {
  res.render('profile', { title: 'profile' });
});

app.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

app.get('/additionalinformation', (req, res) => {
  res.render('additionalinformation', { title: 'Additional Information' });
});
app.get('/ComeFollowMe', (req, res) => {
  res.render('ComeFollowMe', { title: 'Come Follow Me' });
});

app.get('/leadership', (req, res) => {
  res.render('leadership', { title: 'Leadership' });
});

app.get('/announcement', (req, res) => {
  res.render('announcement', { title: 'Announcement' });
});

app.get('/addpicure', (req, res) => {
  res.render('addpicure', { title: 'Add Picure' });
});
app.get('/sacrament', (req, res) => {
  res.render('sacrament', { title: 'Sacrament' });
});






app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// app.use('/', router);

// Catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// Error handlers
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: process.env.NODE_ENV !== 'production' ? err : {}
//   });
// });


// const PORT2 = process.env.PORT || 3000;
// if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
//   config.baseURL = `http://localhost:${PORT}`;
//  }

// app.listen(3200, () => {
//   console.log("Server is running on Port 3200");
// });
// app.listen(process.env.PORT, () => {
//   console.log(`sacrament-program-api running on http://localhost:${process.env.PORT}`);
// });


http.createServer(app)
  .listen(PORT, () => {
    console.log(`Listening on ${config.baseURL}`);
  });