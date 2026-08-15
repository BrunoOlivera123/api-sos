const avaliacaoService = require('../services/avaliacaoService');
const asyncHandler = require('../utils/asyncHandler');

exports.create = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Somente clientes podem avaliar' });
  const avaliacao = await avaliacaoService.create(req.params.id, req.user.id, req.body);
  res.status(201).json({ success: true, message: 'Avaliação criada com sucesso', data: avaliacao });
});

exports.getByChamadoId = asyncHandler(async (req, res) => {
  const avaliacao = await avaliacaoService.getByChamadoId(req.params.id);
  res.status(200).json({ success: true, message: 'Avaliação encontrada', data: avaliacao });
});

exports.update = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Somente clientes podem alterar avaliação' });
  const avaliacao = await avaliacaoService.update(req.params.id, req.user.id, req.body);
  res.status(200).json({ success: true, message: 'Avaliação atualizada com sucesso', data: avaliacao });
});
