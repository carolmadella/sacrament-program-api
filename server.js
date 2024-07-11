var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const http = require('http');
const logger = require('morgan');
const path = require('path');
const router = require('./routes/index');

const mongoose = require('mongoose');
const dataRoutes = require('./routes/dataRoutes');


const { swaggerUi , swaggerSpec } = require('./swagger');
var app = express();

// const express = require('express');
const { auth } = require('express-openid-connect');

// const app = express();

// const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CSE341 Sacrament Meeting Program API",
      version: "1.0.0",
    },
    servers: [{ url: `${process.env.URL}:${process.env.PORT}` }],
  },
  swaggerDefinition: swaggerDoc,
  apis: ["./api-docs/*.js"], // Use a global pattern to include all route files
};

const swaggerSpecs = swaggerJsdoc(options);

// Serve Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use CORS middleware
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// IMPORT ALL ROUTES HERE
const hymnsRoutes = require('./routes/hymnsRoutes');


const { requiresAuth } = require('express-openid-connect');

app.use('/', dataRoutes);

router.get('/index', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

// const navsRoutes = require('./routes/navsRoutes');

// USE ALL ROUTES YOU IMPORTED ABOVE HERE
app.use('/hymns', hymnsRoutes);

app.use('/hymns', hymnsRoutes);
// app.use('/cfm', dataRoutes);
// app.use('/', dataRoutes);

// app.get('/', (req, res) => {
//   res.render('index', { title: 'Home' });
// });
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'about',
    isAuthenticated: req.oidc.isAuthenticated() });
});

router.get('/profile/myProfile', (req, res, next) => {
  res.render('profile/Profile', { title: 'My Profile',
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    isAuthenticated: req.oidc.isAuthenticated() });
});

router.get('/additionalinformation', (req, res) => {
  res.render('additionalinformation', { title: 'Additional Information' });
});
router.get('/ComeFollowMe', (req, res, next) => {
  res.render('ComeFollowMe', { title: 'Come Follow Me',
    isAuthenticated: req.oidc.isAuthenticated()
   });
});

router.get('/leadership', (req, res) => {
  res.render('leadership', { title: 'Leadership' });
});

router.get('/announcement', (req, res) => {
  res.render('announcement', { title: 'Announcement' });
});

router.get('/addpicure', (req, res) => {
  res.render('addpicure', { title: 'Add Picure' });
});
router.get('/sacrament', (req, res) => {
  res.render('sacrament', { title: 'Sacrament' });
});

router.get('/Myresults', (req, res, next) => {
  res.render('Myresults', { title: 'My results' ,
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    isAuthenticated: req.oidc.isAuthenticated() });
});



router.get('/profile',  (req, res) => {
  res.render('profile', {title: 'Sacrament' 
    // userProfile: JSON.stringify(req.oidc.user, null, 2),
    // title: 'Profile page',
    // isAuthenticated: req.oidc.isAuthenticated()
  });
});
// router.get('/indexCFM', async (req, res) => {
//   try {
//     const data = await Data.find({});
//     const lastEntry = await Data.findOne({}).sort({ _id: -1 }).exec();
//     const currentWeek = lastEntry ? parseInt(lastEntry.reference.split(' ')[3]) + 1 : 1;
//     res.render('index', { data, currentWeek });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching data');
//   }
// });


router.get('/bulletin-display', async (req, res) => {
  try {
    const today = new Date();
    const currentWeek = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
    const data = await Data.find({});
    const filteredData = data.filter(item => {
      const itemWeek = Math.ceil((new Date(item.date) - new Date(today.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
      return itemWeek >= currentWeek && itemWeek < currentWeek + 5;
    });

    res.render('bulletinDisplay', { data: filteredData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching bulletin data');
  }
});


// app.post('/post', async (req, res,next) => {
//   const { date, scriptures, lesson, link } = req.body
//   const user = new Users({
//       date,
//       scriptures,
//       lesson,
//       link
//   })
//   await user.save()
//   console.log(user)
//   // res.render('form.html', { message: "Form submission Succesful" })
//   res.redirect('/')
//   next()  

//   // res.send("Form submission Succesful")
// })

// Swagger setup
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const config = {
  authRequired: false,
  auth0Logout: true
};

// app.listen(3410, () => {
//   console.log("Server is running on Port 3410");
// });
// app.listen(process.env.PORT, () => {
//   console.log(`sacrament-program-api running on http://localhost:${process.env.PORT}`);
// });


const port = process.env.PORT || 3410;
if (!config.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 3410);
  res.render('error', {
    message: err.message,
    error: process.env.NODE_ENV !== 'production' ? err : {}
  });
});
const indexRoutes = require('./routes/index2CFM');
app.use('/index2CFM', indexRoutes);

// Routes from both projects
// const project1Routes = require('./routes/project1');
// const project2Routes = require('./routes/project2');

// app.use('/project1', project1Routes);
// app.use('/project2', project2Routes);


mongoose.connect('mongodb://localhost:27017/Sacrament')
  .then(() => console.log('MongoDB connected to comefollowme database'))
  .catch(err => console.error(err));

// http.createServer(app)
//   .listen(port, () => {
//     console.log(`Listening on ${config.baseURL}`);
//   });
app.listen(process.env.PORT, () => {
  console.log(`sacrament-program-api running on http://localhost:${process.env.PORT}`);
});
