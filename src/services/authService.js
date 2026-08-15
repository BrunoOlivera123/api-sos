const prisma = require('../config/database');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

exports.registerCliente = async (data) => {
  const exists = await prisma.cliente.findFirst({
    where: { OR: [{ email: data.email }, { cpf: data.cpf }] }
  });
  if (exists) {
    const error = new Error('Email ou CPF já cadastrado');
    error.statusCode = 409;
    throw error;
  }
  const senhaHash = await hashPassword(data.senha);
  const cliente = await prisma.cliente.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
      telefone: data.telefone,
      cpf: data.cpf
    }
  });
  const { senhaHash: _, ...clienteWithoutPassword } = cliente;
  return clienteWithoutPassword;
};

exports.registerPrestador = async (data) => {
  const exists = await prisma.prestador.findFirst({
    where: { OR: [{ email: data.email }, { cpf: data.cpf }] }
  });
  if (exists) {
    const error = new Error('Email ou CPF já cadastrado');
    error.statusCode = 409;
    throw error;
  }
  const categoriaExists = await prisma.categoria.findUnique({ where: { id: data.categoriaId } });
  if (!categoriaExists) {
    const error = new Error('Categoria não encontrada');
    error.statusCode = 404;
    throw error;
  }
  const senhaHash = await hashPassword(data.senha);
  const prestador = await prisma.prestador.create({
    data: {
      nome: data.nome,
      email: data.email,
      senhaHash,
      telefone: data.telefone,
      cpf: data.cpf,
      categoriaId: data.categoriaId
    }
  });
  const { senhaHash: _, ...prestadorWithoutPassword } = prestador;
  return prestadorWithoutPassword;
};

exports.login = async ({ email, senha, tipo }) => {
  let user;
  if (tipo === 'CLIENTE') {
    user = await prisma.cliente.findUnique({ where: { email } });
  } else {
    user = await prisma.prestador.findUnique({ where: { email } });
  }

  if (!user) {
    const error = new Error('Credenciais incorretas');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(senha, user.senhaHash);
  if (!isMatch) {
    const error = new Error('Credenciais incorretas');
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ id: user.id, tipo });
  const { senhaHash: _, ...userWithoutPassword } = user;
  
  return { token, user: { ...userWithoutPassword, tipo } };
};
