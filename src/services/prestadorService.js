const prisma = require('../config/database');
const ApiError = require('../utils/ApiError');

exports.getMe = async (id) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const prestador = await prisma.prestador.findUnique({ where: { id: intId }, include: { categoria: true } });
  if (!prestador) throw new ApiError('Prestador não encontrado', 404);
  const { senhaHash, ...data } = prestador;
  return data;
};

exports.updateMe = async (id, data) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const prestador = await prisma.prestador.update({
    where: { id: intId },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email,
      categoriaId: data.categoriaId
    }
  });
  const { senhaHash, ...updated } = prestador;
  return updated;
};

exports.updateDisponibilidade = async (id, disponivel) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const prestador = await prisma.prestador.update({
    where: { id: intId },
    data: { disponivel }
  });
  return { disponivel: prestador.disponivel };
};

exports.updateLocalizacao = async (id, latitude, longitude) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const prestador = await prisma.prestador.update({
    where: { id: intId },
    data: { latitude, longitude }
  });
  return { latitude: prestador.latitude, longitude: prestador.longitude };
};

exports.listPrestadores = async (filters) => {
  const where = {};
  if (filters.categoriaId) where.categoriaId = parseInt(filters.categoriaId);
  if (filters.disponivel !== undefined) where.disponivel = filters.disponivel === 'true';

  const prestadores = await prisma.prestador.findMany({
    where,
    select: {
      id: true,
      nome: true,
      email: true,
      telefone: true,
      categoriaId: true,
      disponivel: true,
      latitude: true,
      longitude: true
    }
  });
  return prestadores;
};

exports.getDisponiveis = async (categoriaId) => {
  return await prisma.prestador.findMany({
    where: {
      categoriaId: parseInt(categoriaId),
      disponivel: true,
      latitude: { not: null },
      longitude: { not: null }
    },
    select: {
      id: true, nome: true, telefone: true, latitude: true, longitude: true
    }
  });
};
