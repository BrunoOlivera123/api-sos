const prestadorService = require('../services/prestadorService');
const asyncHandler = require('../utils/asyncHandler');

exports.getMe = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const prestador = await prestadorService.getMe(req.user.id);
  res.status(200).json({ success: true, message: 'Dados recuperados', data: prestador });
});

exports.updateMe = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const prestador = await prestadorService.updateMe(req.user.id, req.body);
  res.status(200).json({ success: true, message: 'Dados atualizados', data: prestador });
});

exports.updateDisponibilidade = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const result = await prestadorService.updateDisponibilidade(req.user.id, req.body.disponivel);
  res.status(200).json({ success: true, message: 'Disponibilidade atualizada', data: result });
});

exports.updateLocalizacao = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'PRESTADOR') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const result = await prestadorService.updateLocalizacao(req.user.id, req.body.latitude, req.body.longitude);
  res.status(200).json({ success: true, message: 'Localização atualizada', data: result });
});

exports.listPrestadores = asyncHandler(async (req, res) => {
  const prestadores = await prestadorService.listPrestadores(req.query);
  res.status(200).json({ success: true, message: 'Prestadores listados', data: prestadores });
});

exports.getDisponiveis = asyncHandler(async (req, res) => {
  if (!req.query.categoriaId) return res.status(400).json({ success: false, message: 'categoriaId é obrigatório' });
  const prestadores = await prestadorService.getDisponiveis(req.query.categoriaId);
  res.status(200).json({ success: true, message: 'Prestadores disponíveis', data: prestadores });
});
