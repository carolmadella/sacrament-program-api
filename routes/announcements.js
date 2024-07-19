const express = require('express');
const router = express.Router();

const controller = require('../controllers/announcements');
const validation = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', validation.saveAnnouncement, controller.createAnnouncement);
router.put('/:id', validation.saveAnnouncement, controller.updateAnnouncement);
router.delete('/:id', controller.deleteAnnouncement);

module.exports = router;