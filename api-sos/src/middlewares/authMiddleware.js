/**
 * API-SOS
 * Arquivo: src/middlewares/authMiddleware.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { verifyToken } = require("../utils/jwt");

// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Token não informado" });
  }
  try {
    req.user = verifyToken(header.substring(7));
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Token inválido ou expirado" });
  }
};