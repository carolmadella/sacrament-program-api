const express = require('express');
const router = express.Router();
const announcementsController = require('../controllers/announcementsController');

router.get('/', announcementsController.getAllAnnouncements);
router.get('/:id', announcementsController.getAnnouncementById);
router.post('/', announcementsController.createAnnouncement);
router.put('/', announcementsController.updateAnnouncement);
router.delete('/', announcementsController.deleteAnnouncement)

module.exports = router;
