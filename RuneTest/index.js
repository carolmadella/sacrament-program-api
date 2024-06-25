var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), function (req, res, next) {
  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/sacrament', requiresAuth(), function (req, res, next) {
    res.render('sacrament', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'sacrament',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });

  router.get('/about', requiresAuth(), function (req, res, next) {
    res.render('about', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'about',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });

  router.get('/additionalinformation', requiresAuth(), function (req, res, next) {
    res.render('additionalinformation', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'additionalinformation',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });


  router.get('/announcement', requiresAuth(), function (req, res, next) {
    res.render('announcement', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'announcement',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });


  router.get('/leadership', requiresAuth(), function (req, res, next) {
    res.render('leadership', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'leadership',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });
  
  app.get('/ComeFollowMe', (req, res) => {
    res.render('ComeFollowMe', { title: 'Come Follow Me' });
  });
//   router.get('/ComeFollowMe', requiresAuth(), function (req, res, next) {
//     res.render('ComeFollowMe', {
//       userProfile: JSON.stringify(req.oidc.user, null, 2),
//       title: 'ComeFollowMe',
//       isAuthenticated: req.oidc.isAuthenticated()
//     });
//   });

  router.get('/addpicure', requiresAuth(), function (req, res, next) {
    res.render('addpicure', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'addpicure',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });

  router.get('/addQuotes', requiresAuth(), function (req, res, next) {
    res.render('addQuotes', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'addQuotes',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });

  //Template
  router.get('/T', requiresAuth(), function (req, res, next) {
    res.render('T', {
      userProfile: JSON.stringify(req.oidc.user, null, 2),
      title: 'T',
      isAuthenticated: req.oidc.isAuthenticated()
    });
  });



module.exports = router;
