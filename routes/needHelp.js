const express = require('express');
const router = express.Router();

const controller = require('../controllers/needHelp');
const validation = require('../middleware/validate');

router.get('/', controller.getAll);
router.get('/:id', controller.getSingle);
router.post('/', validation.saveNeedHelp, controller.createNeedHelp);
router.put('/:id', validation.saveNeedHelp, controller.updateNeedHelp);
router.delete('/:id', controller.deleteNeedHelp);

module.exports = router;