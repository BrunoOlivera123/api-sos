/**
 * API-SOS
 * Arquivo: src/middlewares/validationMiddleware.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = (req, res, next) => {
  const errors = require("express-validator").validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Dados inválidos",
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
