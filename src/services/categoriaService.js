const prisma = require('../config/database');

exports.getAll = async () => {
  return await prisma.categoria.findMany();
};

exports.getById = async (id) => {
  const categoria = await prisma.categoria.findUnique({ where: { id: parseInt(id) } });
  if (!categoria) {
    const error = new Error('Categoria não encontrada');
    error.statusCode = 404;
    throw error;
  }
  return categoria;
};

exports.create = async (data) => {
  return await prisma.categoria.create({ data: { nome: data.nome } });
};

exports.update = async (id, data) => {
  return await prisma.categoria.update({
    where: { id: parseInt(id) },
    data: { nome: data.nome }
  });
};

exports.delete = async (id) => {
  const prestadores = await prisma.prestador.count({ where: { categoriaId: parseInt(id) } });
  const chamados = await prisma.chamado.count({ where: { categoriaId: parseInt(id) } });
  if (prestadores > 0 || chamados > 0) {
    const error = new Error('Não é possível excluir categoria com relacionamentos');
    error.statusCode = 400;
    throw error;
  }
  await prisma.categoria.delete({ where: { id: parseInt(id) } });
};
