const express = require('express');
const router = express.Router();
const chamadoController = require('../controllers/chamadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { createChamadoSchema } = require('../validations/chamadoValidation');

router.use(authMiddleware);
router.post('/', validate(createChamadoSchema), chamadoController.create);
router.get('/', chamadoController.list);
router.get('/:id', chamadoController.getById);
router.patch('/:id/aceitar', chamadoController.aceitar);
router.patch('/:id/iniciar', chamadoController.iniciar);
router.patch('/:id/concluir', chamadoController.concluir);
router.patch('/:id/cancelar', chamadoController.cancelar);

module.exports = router;
