/**
 * API-SOS
 * Arquivo: src/validations/avaliacaoValidation.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { body, param } = require("express-validator");
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = [
  param("id").isUUID(),
  body("nota")
    .isInt({ min: 1, max: 5 })
    .withMessage("Nota deve estar entre 1 e 5"),
  body("comentario").optional().isString(),
];
