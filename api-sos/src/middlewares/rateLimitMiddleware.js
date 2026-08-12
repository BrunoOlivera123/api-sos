/**
 * API-SOS
 * Arquivo: src/middlewares/rateLimitMiddleware.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const rateLimit = require("express-rate-limit");
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false
});