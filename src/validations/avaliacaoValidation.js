const { z } = require('zod');

exports.createAvaliacaoSchema = z.object({
  body: z.object({
    nota: z.number().int().min(1).max(5),
    comentario: z.string().optional()
  })
});
