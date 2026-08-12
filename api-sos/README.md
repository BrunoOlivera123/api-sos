# API-SOS — Backend comentado

Este pacote contém o backend REST do sistema SOS.

## Objetivo

A API foi organizada em camadas:

- `routes/` — define os endpoints.
- `controllers/` — recebe a requisição e devolve a resposta.
- `services/` — concentra regras de negócio mais importantes.
- `middlewares/` — autenticação, validação, erros e rate limit.
- `validations/` — valida os dados recebidos.
- `config/` — configura ambiente e conexão com banco.
- `utils/` — funções auxiliares.
- `prisma/` — modelo do PostgreSQL e seed.

Os arquivos JavaScript e o schema Prisma foram comentados para facilitar o entendimento do código.

## Como instalar

```bash
npm install
```

## Configurar ambiente

Copie `.env.example` para `.env` e configure:

- `DATABASE_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `PORT`
- `FRONTEND_URL`

## Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run prisma:seed
```

## Iniciar

```bash
npm run dev
```

A API inicia por padrão em `http://localhost:3000`.

## Health check

```text
GET /api/health
```

## Fluxo de chamados

O fluxo principal é:

```text
ABERTO
  ↓
ACEITO
  ↓
EM_ATENDIMENTO
  ↓
CONCLUIDO
```

Também são permitidos:

```text
ABERTO → CANCELADO
ACEITO → CANCELADO
```

A regra de transição está centralizada no service de chamados.

## Autenticação

O login gera um JWT contendo o identificador do usuário e o tipo:

- `CLIENTE`
- `PRESTADOR`

Endpoints protegidos devem receber:

```text
Authorization: Bearer SEU_TOKEN
```

## Segurança

O projeto utiliza:

- bcrypt para hash de senhas;
- JWT para autenticação;
- Helmet;
- CORS;
- rate limiting;
- validação de entrada;
- tratamento global de erros;
- variáveis de ambiente.

Senha e `senhaHash` nunca devem ser enviados ao frontend.

## Observação importante

As migrations do Prisma são geradas localmente a partir do `schema.prisma` e da configuração do PostgreSQL. Por isso, o pacote contém o schema e o seed, mas a migration inicial deve ser criada no ambiente onde o banco estiver configurado.

## Testes

Estrutura preparada para Jest e Supertest:

```bash
npm test
```
