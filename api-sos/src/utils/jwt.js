/**
 * API-SOS
 * Arquivo: src/utils/jwt.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../config/env");

function signToken(payload) {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = { signToken, verifyToken };
