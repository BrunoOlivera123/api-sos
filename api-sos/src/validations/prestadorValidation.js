/**
 * API-SOS
 * Arquivo: src/validations/prestadorValidation.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { body } = require("express-validator");
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = {
  update: [body("nome").optional().trim().notEmpty(), body("email").optional().isEmail().normalizeEmail(), body("telefone").optional().isString(), body("categoriaId").optional().isInt({ min: 1 })],
  availability: [body("disponivel").isBoolean()],
  location: [body("latitude").isFloat({ min: -90, max: 90 }), body("longitude").isFloat({ min: -180, max: 180 })]
};