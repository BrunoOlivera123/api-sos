const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

exports.registerCliente = asyncHandler(async (req, res) => {
  const cliente = await authService.registerCliente(req.body);
  res.status(201).json({ success: true, message: 'Cliente registrado com sucesso', data: cliente });
});

exports.registerPrestador = asyncHandler(async (req, res) => {
  const prestador = await authService.registerPrestador(req.body);
  res.status(201).json({ success: true, message: 'Prestador registrado com sucesso', data: prestador });
});

exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json({
    success: true,
    message: 'Login realizado com sucesso',
    token: result.token,
    user: result.user
  });
});
