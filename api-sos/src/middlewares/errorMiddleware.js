/**
 * API-SOS
 * Arquivo: src/middlewares/errorMiddleware.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.code === "P2002") {
    return res.status(409).json({ success: false, message: "Registro duplicado", fields: err.meta?.target || [] });
  }
  if (err.code === "P2025") {
    return res.status(404).json({ success: false, message: "Registro não encontrado" });
  }
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Erro interno do servidor" : err.message
  });
};