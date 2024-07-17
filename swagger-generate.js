const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Sacrament API',
        description: 'Description'
    },
    host: [
        'localhost:3410',
        'sacrament-program-api-8pcq.onrender.com'
    ],
    schemes: [
        'http', 'https'
    ],
    servers: [{
        url: 'http://localhost:3410', // Change this to your actual server URL
        url: 'https://sacrament-program-api.onrender.com/', // Change this to your actual server URL
    }],
    securityDefinitions: {
        oauth2: {
            type: 'oauth2',
            flow: 'authorizationCode',
            authorizationUrl: 'http://localhost:3410/auth/google/callback',
            tokenUrl: 'http://localhost:3410/oauth/token',
            scopes: ''
        }
    }
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);