const express = require('express');
const router = express.Router();
const speakersController = require('../controllers/speakersController');

router.get('/', speakersController.getAllSpeakers);
router.get('/:id', speakersController.getSpeakerById);
router.post('/', speakersController.createSpeaker);
router.put('/', speakersController.createSpeaker);
router.delete('/', speakersController.createSpeaker);

module.exports = router;