const categoriaService = require('../services/categoriaService');
const asyncHandler = require('../utils/asyncHandler');

exports.getAll = asyncHandler(async (req, res) => {
  const categorias = await categoriaService.getAll();
  res.status(200).json({ success: true, message: 'Categorias listadas', data: categorias });
});

exports.getById = asyncHandler(async (req, res) => {
  const categoria = await categoriaService.getById(req.params.id);
  res.status(200).json({ success: true, message: 'Categoria encontrada', data: categoria });
});

exports.create = asyncHandler(async (req, res) => {
  const categoria = await categoriaService.create(req.body);
  res.status(201).json({ success: true, message: 'Categoria criada', data: categoria });
});

exports.update = asyncHandler(async (req, res) => {
  const categoria = await categoriaService.update(req.params.id, req.body);
  res.status(200).json({ success: true, message: 'Categoria atualizada', data: categoria });
});

exports.delete = asyncHandler(async (req, res) => {
  await categoriaService.delete(req.params.id);
  res.status(200).json({ success: true, message: 'Categoria excluída' });
});
