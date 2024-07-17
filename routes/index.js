const express = require('express');
const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/meetings', require('./meetings'))
router.use('/announcements', require('./announcements'))
router.use('/activities', require('./activities'))
router.use('/needHelp', require('./needHelp'))

module.exports = router;