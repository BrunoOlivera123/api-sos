const express = require('express');
const router = express.Router({ mergeParams: true });
const avaliacaoController = require('../controllers/avaliacaoController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validationMiddleware');
const { createAvaliacaoSchema } = require('../validations/avaliacaoValidation');

router.use(authMiddleware);
router.post('/', validate(createAvaliacaoSchema), avaliacaoController.create);
router.get('/', avaliacaoController.getByChamadoId);
router.put('/', validate(createAvaliacaoSchema), avaliacaoController.update);

module.exports = router;
