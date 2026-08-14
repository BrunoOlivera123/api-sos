/**
 * API-SOS
 * Arquivo: src/validations/authValidation.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { body } = require("express-validator");
const base = [
  body("nome").trim().notEmpty().withMessage("Nome é obrigatório"),
  body("email")
    .isEmail()
    .withMessage("Informe um email válido")
    .normalizeEmail(),
  body("senha")
    .isLength({ min: 6 })
    .withMessage("Senha deve ter no mínimo 6 caracteres"),
  body("cpf").trim().notEmpty().withMessage("CPF é obrigatório"),
];
const clienteRegister = [...base, body("telefone").optional().isString()];
const prestadorRegister = [
  ...base,
  body("telefone").optional().isString(),
  body("categoriaId").isInt({ min: 1 }).withMessage("Categoria inválida"),
];
const login = [
  body("email").isEmail().normalizeEmail(),
  body("senha").notEmpty(),
  body("tipo").isIn(["CLIENTE", "PRESTADOR"]),
];
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = { clienteRegister, prestadorRegister, login };
