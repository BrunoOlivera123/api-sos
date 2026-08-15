const { z } = require('zod');

exports.createChamadoSchema = z.object({
  body: z.object({
    categoriaId: z.number().int().positive(),
    latitude: z.number(),
    longitude: z.number(),
    endereco: z.string().optional(),
    descricao: z.string().optional()
  })
});
