const { z } = require('zod');

exports.registerClienteSchema = z.object({
  body: z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    telefone: z.string().optional(),
    cpf: z.string().length(11, 'CPF deve ter 11 caracteres')
  })
});

exports.registerPrestadorSchema = z.object({
  body: z.object({
    nome: z.string().min(1, 'Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    telefone: z.string().optional(),
    cpf: z.string().length(11, 'CPF deve ter 11 caracteres'),
    categoriaId: z.number().int().positive()
  })
});

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().email('Email inválido'),
    senha: z.string().min(1, 'Senha é obrigatória'),
    tipo: z.enum(['CLIENTE', 'PRESTADOR'], { required_error: 'Tipo é obrigatório (CLIENTE ou PRESTADOR)' })
  })
});
