/**
 * API-SOS
 * Arquivo: src/routes/authRoutes.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cria um Router isolado para organizar os endpoints deste recurso.
const router = require("express").Router(),
  c = require("../controllers/authController"),
  v = require("../validations/authValidation"),
  vm = require("../middlewares/validationMiddleware");
// Define um endpoint HTTP POST.
router.post("/cliente/register", v.clienteRegister, vm, c.registerCliente); // Define um endpoint HTTP POST.
router.post(
  "/prestador/register",
  v.prestadorRegister,
  vm,
  c.registerPrestador,
); // Define um endpoint HTTP POST.
router.post("/login", v.login, vm, c.login);
module.exports = router;
