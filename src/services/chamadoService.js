const prisma = require('../config/database');

exports.create = async (clienteId, data) => {
  return await prisma.chamado.create({
    data: {
      clienteId,
      categoriaId: data.categoriaId,
      latitude: data.latitude,
      longitude: data.longitude,
      endereco: data.endereco,
      descricao: data.descricao,
      status: 'ABERTO'
    }
  });
};

exports.list = async (user) => {
  if (user.tipo === 'CLIENTE') {
    return await prisma.chamado.findMany({ where: { clienteId: user.id } });
  } else {
    const prestador = await prisma.prestador.findUnique({ where: { id: user.id } });
    return await prisma.chamado.findMany({
      where: {
        OR: [
          { prestadorId: user.id },
          { categoriaId: prestador.categoriaId, status: 'ABERTO' }
        ]
      }
    });
  }
};

const ApiError = require('../utils/ApiError');

exports.getById = async (id) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const chamado = await prisma.chamado.findUnique({
    where: { id: intId },
    include: {
      cliente: { select: { id: true, nome: true, email: true, telefone: true } },
      categoria: true,
      prestador: { select: { id: true, nome: true, email: true, telefone: true } },
      avaliacao: true
    }
  });
  if (!chamado) throw new ApiError('Chamado não encontrado', 404);
  return chamado;
};

exports.aceitar = async (id, prestadorId) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  return await prisma.$transaction(async (tx) => {
    const chamado = await tx.chamado.findUnique({ where: { id: intId } });
    if (!chamado) throw new ApiError('Chamado não encontrado', 404);
    if (chamado.status !== 'ABERTO') throw new ApiError('Chamado não está disponível para aceite', 400);

    const prestador = await tx.prestador.findUnique({ where: { id: prestadorId } });
    if (!prestador || !prestador.disponivel) throw new ApiError('Prestador indisponível', 400);
    if (prestador.categoriaId !== chamado.categoriaId) throw new ApiError('Categoria incompatível com o prestador', 400);

    const chamadoAtualizado = await tx.chamado.update({
      where: { id: intId },
      data: { prestadorId, status: 'ACEITO', dataAceite: new Date() }
    });

    await tx.prestador.update({
      where: { id: prestadorId },
      data: { disponivel: false }
    });

    return chamadoAtualizado;
  });
};

exports.iniciar = async (id, prestadorId) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const chamado = await prisma.chamado.findUnique({ where: { id: intId } });
  if (!chamado || chamado.prestadorId !== prestadorId) throw new ApiError('Ação não permitida', 403);
  if (chamado.status !== 'ACEITO') throw new ApiError('Status inválido para iniciar atendimento', 400);

  return await prisma.chamado.update({
    where: { id: intId },
    data: { status: 'EM_ATENDIMENTO' }
  });
};

exports.concluir = async (id, prestadorId) => {
  return await prisma.$transaction(async (tx) => {
    const intId = parseInt(id);
    if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
    const chamado = await tx.chamado.findUnique({ where: { id: intId } });
    if (!chamado || chamado.prestadorId !== prestadorId) throw new ApiError('Ação não permitida', 403);
    if (chamado.status !== 'EM_ATENDIMENTO') throw new ApiError('Status inválido para conclusão', 400);

    const chamadoAtualizado = await tx.chamado.update({
      where: { id: intId },
      data: { status: 'CONCLUIDO', dataConclusao: new Date() }
    });

    await tx.prestador.update({
      where: { id: prestadorId },
      data: { disponivel: true }
    });

    return chamadoAtualizado;
  });
};

exports.cancelar = async (id, user) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  return await prisma.$transaction(async (tx) => {
    const chamado = await tx.chamado.findUnique({ where: { id: intId } });
    if (!chamado) throw new ApiError('Chamado não encontrado', 404);
    if (!['ABERTO', 'ACEITO'].includes(chamado.status)) {
      throw new ApiError('Chamado não pode ser cancelado no status atual', 400);
    }
    
    // Verificações de permissão baseadas no usuário
    if (user.tipo === 'CLIENTE' && chamado.clienteId !== user.id) throw new ApiError('Acesso negado', 403);
    if (user.tipo === 'PRESTADOR' && chamado.prestadorId !== user.id) throw new ApiError('Acesso negado', 403);

    const chamadoCancelado = await tx.chamado.update({
      where: { id: intId },
      data: { status: 'CANCELADO' }
    });

    if (chamado.prestadorId) {
      await tx.prestador.update({
        where: { id: chamado.prestadorId },
        data: { disponivel: true }
      });
    }

    return chamadoCancelado;
  });
};
