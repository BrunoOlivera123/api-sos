const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/me', clienteController.getMe);
router.put('/me', clienteController.updateMe);
router.delete('/me', clienteController.deleteMe);

module.exports = router;
