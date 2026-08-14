/**
 * API-SOS
 * Arquivo: src/validations/chamadoValidation.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { body, param, query } = require("express-validator");
const uuid = (field) => param(field).isUUID().withMessage(`${field} inválido`);
const create = [
  body("categoriaId").isInt({ min: 1 }),
  body("latitude").isFloat({ min: -90, max: 90 }),
  body("longitude").isFloat({ min: -180, max: 180 }),
  body("endereco").optional().isString(),
  body("descricao").optional().isString(),
];
const id = [uuid("id")];
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = {
  create,
  id,
  categoriaQuery: [query("categoriaId").isInt({ min: 1 })],
};
