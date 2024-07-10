const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.get('/', meetingsController.getAllMeetings);
router.get('/:id', meetingsController.getMeetingsById);
router.post('/', meetingsController.createMeetings);
router.put('/', meetingsController.updateMeetings);
router.delete('/', meetingsController.deleteMeetings)

module.exports = router;