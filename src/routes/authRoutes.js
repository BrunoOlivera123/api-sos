const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');
const { registerClienteSchema, registerPrestadorSchema, loginSchema } = require('../validations/authValidation');

router.post('/cliente/register', validate(registerClienteSchema), authController.registerCliente);
router.post('/prestador/register', validate(registerPrestadorSchema), authController.registerPrestador);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
