const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementsController');

router.get('/', announcementsController.getAllAnnouncements);
router.get('/:id', announcementsController.getAnnouncementsById);
router.post('/', announcementsController.createAnnouncements);
router.put('/', announcementsController.updateAnnouncements);
router.delete('/', announcementsController.deleteAnnouncements)

module.exports = router;