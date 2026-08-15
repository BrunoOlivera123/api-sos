const chamadoService = require('../services/chamadoService');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Somente clientes podem criar chamados' });
  const chamado = await chamadoService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: 'Chamado criado', data: chamado });
});

exports.list = asyncHandler(async (req, res) => {
  const chamados = await chamadoService.list(req.user);
  res.status(200).json({ success: true, message: 'Chamados listados', data: chamados });
});

exports.getById = asyncHandler(async (req, res) => {
  const chamado = await chamadoService.getById(req.params.id);
  res.status(200).json({ success: true, message: 'Chamado encontrado', data: chamado });
});

exports.aceitar = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Somente prestadores podem aceitar chamados' });
  const chamado = await chamadoService.aceitar(req.params.id, req.user.id);
  res.status(200).json({ success: true, message: 'Chamado aceito', data: chamado });
});

exports.iniciar = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const chamado = await chamadoService.iniciar(req.params.id, req.user.id);
  res.status(200).json({ success: true, message: 'Atendimento iniciado', data: chamado });
});

exports.concluir = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const chamado = await chamadoService.concluir(req.params.id, req.user.id);
  res.status(200).json({ success: true, message: 'Atendimento concluído', data: chamado });
});

exports.cancelar = asyncHandler(async (req, res) => {
  const chamado = await chamadoService.cancelar(req.params.id, req.user);
  res.status(200).json({ success: true, message: 'Chamado cancelado', data: chamado });
});
