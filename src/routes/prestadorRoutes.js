const express = require('express');
const router = express.Router();
const prestadorController = require('../controllers/prestadorController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/me', prestadorController.getMe);
router.put('/me', prestadorController.updateMe);
router.patch('/me/disponibilidade', prestadorController.updateDisponibilidade);
router.patch('/me/localizacao', prestadorController.updateLocalizacao);
router.get('/disponiveis', prestadorController.getDisponiveis);
router.get('/', prestadorController.listPrestadores);

module.exports = router;
