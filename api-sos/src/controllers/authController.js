/**
 * API-SOS
 * Arquivo: src/controllers/authController.js
 *
 * Este arquivo faz parte do backend REST do sistema SOS.
 * Os comentários foram adicionados para facilitar o estudo e a manutenção.
 */

// Cliente Prisma usado para acessar o PostgreSQL.
const prisma = require("../config/database");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

const publicUser = (u, tipo) => ({ id: u.id, nome: u.nome, email: u.email, telefone: u.telefone, cpf: u.cpf, tipo });

async function register(req, res, tipo) {
  const { nome, email, senha, telefone, cpf, categoriaId } = req.body;
  const Model = tipo === "CLIENTE" ? prisma.cliente : prisma.prestador;
  if (tipo === "PRESTADOR" && !(await prisma.categoria.findUnique({ where: { id: Number(categoriaId) } }))) {
    return res.status(400).json({ success: false, message: "Categoria não encontrada" });
  }
  const user = await Model.create({ data: { nome, email, senhaHash: await hashPassword(senha), telefone, cpf, ...(tipo === "PRESTADOR" ? { categoriaId: Number(categoriaId) } : {}) } });
  res.status(201).json({ success: true, message: "Cadastro realizado com sucesso", data: publicUser(user, tipo) });
}
exports.registerCliente = (req,res,next)=>register(req,res,"CLIENTE").catch(next);
exports.registerPrestador = (req,res,next)=>register(req,res,"PRESTADOR").catch(next);

exports.login = async (req,res,next) => {
  try {
    const { email, senha, tipo } = req.body;
    const Model = tipo === "CLIENTE" ? prisma.cliente : prisma.prestador;
    const user = await Model.findUnique({ where: { email } });
    if (!user || !(await comparePassword(senha, user.senhaHash))) return res.status(401).json({ success:false, message:"Credenciais inválidas" });
    const token = signToken({ id:user.id, tipo });
    res.json({ success:true, message:"Login realizado com sucesso", token, user: publicUser(user,tipo) });
  } catch(e){ next(e); }
};