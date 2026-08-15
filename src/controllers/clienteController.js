const clienteService = require('../services/clienteService');
const asyncHandler = require('../utils/asyncHandler');

exports.getMe = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const cliente = await clienteService.getMe(req.user.id);
  res.status(200).json({ success: true, message: 'Dados recuperados', data: cliente });
});

exports.updateMe = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Acesso negado' });
  const cliente = await clienteService.updateMe(req.user.id, req.body);
  res.status(200).json({ success: true, message: 'Dados atualizados', data: cliente });
});

exports.deleteMe = asyncHandler(async (req, res) => {
  if (req.user.tipo !== 'CLIENTE') return res.status(403).json({ success: false, message: 'Acesso negado' });
  await clienteService.deleteMe(req.user.id);
  res.status(200).json({ success: true, message: 'Conta excluída com sucesso' });
});
