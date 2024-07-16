const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

router.get('/', meetingsController.getAllMeetings);
router.get('/:id', meetingsController.getMeetingById);
router.post('/', meetingsController.createMeeting);
router.put('/', meetingsController.updateMeeting);
router.delete('/', meetingsController.deleteMeeting)

module.exports = router;
