const express = require('express');
const router = express.Router();
const speakersController = require('../controllers/speakersController');

router.get('/', speakersController.getAllPeople);
router.get('/:id', speakersController.getPeopleById);
router.post('/', speakersController.createPeople);
router.put('/', speakersController.createPeople);
router.delete('/', speakersController.createPeople);

module.exports = router;