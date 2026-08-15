# API-SOS

API REST completa e profissional para o sistema API-SOS.

## Tecnologias Utilizadas
- Node.js (CommonJS)
- Express.js
- PostgreSQL
- Prisma ORM
- JWT (Autenticação)
- bcryptjs (Hash de senhas)
- Zod (Validação de dados)
- Jest & Supertest (Testes)

## Pré-requisitos
- Node.js (v18+)
- PostgreSQL rodando localmente ou em container (Docker)

## Instalação e Configuração

1. Clone ou extraia o projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configure o banco de dados PostgreSQL. Crie um banco chamado `apisos` (ou outro nome de sua preferência).
4. Copie o arquivo `.env.example` para `.env` e configure suas variáveis, incluindo a `DATABASE_URL` e `JWT_SECRET`.
   ```bash
   cp .env.example .env
   ```
5. Inicialize o Prisma, gere o client, rode as migrations e o seed:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   ```
6. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

A API estará rodando em `http://localhost:3000`. Teste o health check em `http://localhost:3000/api/health`.
