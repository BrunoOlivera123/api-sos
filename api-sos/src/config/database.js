/**
 * API-SOS
 * Arquivo: src/config/database.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { PrismaClient } = require("@prisma/client");
// Cliente Prisma usado para acessar o PostgreSQL.
const prisma = new PrismaClient();
// Exporta a configuração/função para ser reutilizada por outros módulos.
module.exports = prisma;
