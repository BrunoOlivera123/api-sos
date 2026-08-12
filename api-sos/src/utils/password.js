/**
 * API-SOS
 * Arquivo: src/utils/password.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hash(password, 12);
const comparePassword = (password, hash) => bcrypt.compare(password, hash);

// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = { hashPassword, comparePassword };