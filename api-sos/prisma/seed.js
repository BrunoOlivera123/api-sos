/**
 * API-SOS
 * Arquivo: prisma/seed.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

const { PrismaClient } = require("@prisma/client"); // Cliente Prisma usado para acessar o PostgreSQL.
const prisma = new PrismaClient();
async function main() {
  for (const nome of [
    "Eletricista",
    "Encanador",
    "Mecânico",
    "Chaveiro",
    "Guincho",
    "Assistência Geral",
  ]) {
    await prisma.categoria.upsert({
      where: { nome },
      update: {},
      create: { nome },
    });
  }
  console.log("Seed concluído");
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
