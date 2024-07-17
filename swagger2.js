const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Sacrament API',
    description: 'Sacrament API'
  },
  host: 'localhost:3410',
  schemes: ['http','https']
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

//generate swagger.json
//swaggerAutogen(outputFile, endpointsFiles, doc)

//Run server after it gets generated
swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  await import('./index.js');
});