var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

const path = require('path');

// Set the view engine to EJS
app.set('view engine', 'ejs');

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



// app.listen(3200, () => {
//   console.log("Server is running on Port 3200");
// });
app.listen(process.env.PORT, () => {
  console.log(`sacrament-program-api running on http://localhost:${process.env.PORT}`);
});