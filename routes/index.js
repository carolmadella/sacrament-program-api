const router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router
  //.use('/', require('./swagger'))
  .use('/people', require('./people'))
  .use('/hymnsRoutes', require('./hymnsRoutes'))

  .get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

// router.get('/profile',  function (req, res, next) {
//   res.render('profile', {
//     // userProfile: JSON.stringify(req.oidc.user, null, 2),
//     title: 'Profile page',
//     isAuthenticated: req.oidc.isAuthenticated()
//   });
// });
router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});
module.exports = router;
