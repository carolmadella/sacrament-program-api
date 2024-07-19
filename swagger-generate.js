const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Sacrament API',
        description: 'Description',
        description: 'API documentation for the Sacrament webpage',
    },
    host: [
        // 'localhost:3000',
        'sacrament-program-api-1.onrender.com'
    ],
    schemes: [
        // 'http',
        'https'
    ],
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);