const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categorias = [
    'Eletricista',
    'Encanador',
    'Mecânico',
    'Chaveiro',
    'Guincho',
    'Assistência Geral'
  ];

  console.log('Iniciando seed de categorias...');
  for (const nome of categorias) {
    await prisma.categoria.upsert({
      where: { nome },
      update: {},
      create: { nome }
    });
  }
  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
