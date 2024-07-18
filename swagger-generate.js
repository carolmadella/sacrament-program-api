const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Sacrament API',
        description: 'Description',
        description: 'API documentation for the Sacrament webpage',
    },
    host: [
        'localhost:3000',
        'sacrament-program-api-8pcq.onrender.com'
    ],
    schemes: [
        'http',
        'https'
    ],
    servers: [{
        url: 'http://localhost:3000', // Change this to your actual server URL
        url: 'https://sacrament-program-api-8pcq.onrender.com', // Change this to your actual server URL
    }]
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);