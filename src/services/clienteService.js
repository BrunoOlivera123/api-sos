const prisma = require('../config/database');
const ApiError = require('../utils/ApiError');

exports.getMe = async (id) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const cliente = await prisma.cliente.findUnique({ where: { id: intId } });
  if (!cliente) throw new ApiError('Cliente não encontrado', 404);
  const { senhaHash, ...data } = cliente;
  return data;
};

exports.updateMe = async (id, data) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  const cliente = await prisma.cliente.update({
    where: { id: intId },
    data: {
      nome: data.nome,
      telefone: data.telefone,
      email: data.email
    }
  });
  const { senhaHash, ...updated } = cliente;
  return updated;
};

exports.deleteMe = async (id) => {
  const intId = parseInt(id);
  if (Number.isNaN(intId)) throw new ApiError('ID inválido', 400);
  // Strategy: Ensure no active chamados, or cascade logic.
  const activeChamados = await prisma.chamado.count({
    where: { clienteId: intId, status: { in: ['ABERTO', 'ACEITO', 'EM_ATENDIMENTO'] } }
  });
  if (activeChamados > 0) {
    throw new ApiError('Não é possível excluir a conta com chamados ativos', 400);
  }
  await prisma.cliente.delete({ where: { id: intId } });
};
