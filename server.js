const dotenv = require('dotenv');
const express = require("express");
const http = require('http');
const logger = require('morgan');
const path = require('path');
// const router = require('./routes/index');
const { auth, requiresAuth }  = require('express-openid-connect');
// const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();




// Set the view engine to EJS
app.set('view engine', 'ejs');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3410',
  clientID: 'A07aavT8jjCMjsFZCr6mq4Ob8AWYnn2w',
  issuerBaseURL: 'https://dev-2m0hivzhngw2t7lk.us.auth0.com'
};



// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));


app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

// app.use('/', router);




// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

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
app.use(auth(config));
// const swaggerSpecs = swaggerJsdoc(options);
// const PORT = process.env.PORT || 3410;
// if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
//   config.baseURL = `http://localhost:${PORT}`;
// }




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


// const navsRoutes = require('./routes/navsRoutes');

// USE ALL ROUTES YOU IMPORTED ABOVE HERE
app.use('/hymns', hymnsRoutes);

app.use('/hymns', hymnsRoutes);


app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
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

app.get('/login', (req, res) => {
  res.render('login', { title: 'login' });
});


app.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});
// app.listen(3200, () => {
//   console.log("Server is running on Port 3200");
// });
app.listen(process.env.PORT, () => {
  console.log(`sacrament-program-api running on http://localhost:${process.env.PORT}`);
});