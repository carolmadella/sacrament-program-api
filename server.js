var express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var app = express();

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

// IMPORT ALL ROUTES HERE
const hymnsRoutes = require('./routes/hymnsRoutes');

// USE ALL ROUTES YOU IMPORTED ABOVE HERE
app.use('/hymns', hymnsRoutes);

app.listen(3200, () => {
  console.log("Server is running on Port 3200");
});