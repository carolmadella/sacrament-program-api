const express = require('express');
const router = express.Router();

const controller = require('../controllers/meetings');
const validation = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', validation.saveMeeting, controller.createMeeting);
router.put('/:id', validation.saveMeeting, controller.updateMeeting);
router.delete('/:id', controller.deleteMeeting);

module.exports = router;