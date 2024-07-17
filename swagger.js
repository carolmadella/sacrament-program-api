const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  info: {
    title: 'Sacrament API',
    version: '1.0.0',
    description: 'API documentation for the Sacrament webpage',
  },
  servers: [
    {
      url: 'http://localhost:3410'
    },
      {
        url: 'https://sacrament-program-api.onrender.com/'
      },      
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/index.js'], // Adjust the path as needed
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
