/**
 * API-SOS
 * Arquivo: src/validations/clienteValidation.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { body } = require("express-validator");
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = [body("nome").optional().trim().notEmpty(), body("email").optional().isEmail().normalizeEmail(), body("telefone").optional().isString()];