/**
 * API-SOS
 * Arquivo: src/services/chamadoService.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma = require("../config/database");
const transitions = {
  ABERTO: ["ACEITO", "CANCELADO"],
  ACEITO: ["EM_ATENDIMENTO", "CANCELADO"],
  EM_ATENDIMENTO: ["CONCLUIDO"],
  CONCLUIDO: [],
  CANCELADO: [],
};
async function accept(id, prestadorId) {
  return prisma.$transaction(async (tx) => {
    const call = await tx.chamado.findUnique({ where: { id } });
    if (!call)
      throw Object.assign(new Error("Chamado não encontrado"), { status: 404 });
    if (call.status !== "ABERTO")
      throw Object.assign(new Error("Chamado não está aberto"), {
        status: 409,
      });
    const p = await tx.prestador.findUnique({ where: { id: prestadorId } });
    if (!p || !p.disponivel)
      throw Object.assign(new Error("Prestador indisponível"), { status: 409 });
    if (p.categoriaId !== call.categoriaId)
      throw Object.assign(new Error("Categoria incompatível"), { status: 403 });
    const updated = await tx.chamado.updateMany({
      where: { id, status: "ABERTO" },
      data: { prestadorId, status: "ACEITO", dataAceite: new Date() },
    });
    if (updated.count !== 1)
      throw Object.assign(new Error("Chamado já foi aceito"), { status: 409 });
    await tx.prestador.update({
      where: { id: prestadorId },
      data: { disponivel: false },
    });
    return tx.chamado.findUnique({
      where: { id },
      include: { cliente: true, categoria: true, prestador: true },
    });
  });
}
async function change(id, prestadorId, to) {
  return prisma.$transaction(async (tx) => {
    const c = await tx.chamado.findUnique({ where: { id } });
    if (!c)
      throw Object.assign(new Error("Chamado não encontrado"), { status: 404 });
    if (c.prestadorId !== prestadorId)
      throw Object.assign(new Error("Sem permissão"), { status: 403 });
    if (!transitions[c.status]?.includes(to))
      throw Object.assign(new Error("Transição de status inválida"), {
        status: 409,
      });
    const data = { status: to };
    if (to === "CONCLUIDO") data.dataConclusao = new Date();
    const out = await tx.chamado.update({
      where: { id },
      data,
      include: {
        cliente: true,
        categoria: true,
        prestador: true,
        avaliacao: true,
      },
    });
    if (to === "CONCLUIDO" || to === "CANCELADO")
      await tx.prestador.update({
        where: { id: prestadorId },
        data: { disponivel: true },
      });
    return out;
  });
}
module.exports = { accept, change, transitions };
