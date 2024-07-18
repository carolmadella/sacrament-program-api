const express = require('express');
const router = express.Router();
const {
    requiresAuth
} = require('express-openid-connect');

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Auth0 Webapp sample Nodejs',
        isAuthenticated: req.oidc.isAuthenticated()
    });
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', requiresAuth(), swaggerUi.serve);
router.get('/api-docs', requiresAuth(), swaggerUi.setup(swaggerDocument));
router.use('/meetings', requiresAuth(), require('./meetings'));
router.use('/announcements', requiresAuth(), require('./announcements'));
router.use('/activities', requiresAuth(), require('./activities'));
router.use('/needHelp', requiresAuth(), require('./needHelp'));

module.exports = router;