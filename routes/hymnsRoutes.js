const express = require('express');
const router = express.Router();
const hymnsController = require('../controllers/hymnsController');

router.get('/', hymnsController.getAllHymns);
router.get('/:id', hymnsController.getHymnById);
router.post('/', hymnsController.createHymn);


module.exports = router;
