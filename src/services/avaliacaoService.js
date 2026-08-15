const prisma = require('../config/database');
const ApiError = require('../utils/ApiError');

exports.create = async (chamadoId, clienteId, data) => {
  const intId = parseInt(chamadoId);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const chamado = await prisma.chamado.findUnique({ where: { id: intId } });
  if (!chamado) throw new ApiError('Chamado não encontrado', 404);
  if (chamado.clienteId !== clienteId) throw new ApiError('Acesso negado', 403);
  if (chamado.status !== 'CONCLUIDO') throw new ApiError('Somente chamados concluídos podem ser avaliados', 400);
  
  const existing = await prisma.avaliacao.findUnique({ where: { chamadoId } });
  if (existing) throw new ApiError('Chamado já possui avaliação', 400);

  return await prisma.avaliacao.create({
    data: {
      chamadoId,
      nota: data.nota,
      comentario: data.comentario
    }
  });
};

exports.getByChamadoId = async (chamadoId) => {
  const intId = parseInt(chamadoId);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const avaliacao = await prisma.avaliacao.findUnique({ where: { chamadoId: intId } });
  if (!avaliacao) throw new ApiError('Avaliação não encontrada', 404);
  return avaliacao;
};

exports.update = async (chamadoId, clienteId, data) => {
  const intId = parseInt(chamadoId);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const chamado = await prisma.chamado.findUnique({ where: { id: intId } });
  if (!chamado || chamado.clienteId !== clienteId) throw new ApiError('Acesso negado', 403);
  
  const avaliacao = await prisma.avaliacao.findUnique({ where: { chamadoId: intId } });
  if (!avaliacao) throw new ApiError('Avaliação não encontrada', 404);

  return await prisma.avaliacao.update({
    where: { chamadoId: intId },
    data: { nota: data.nota, comentario: data.comentario }
  });
};
