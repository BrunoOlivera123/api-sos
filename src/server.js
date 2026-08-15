const app = require('./app');
const env = require('./config/env');
const prisma = require('./config/database');

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    
    app.listen(env.port, () => {
      console.log(`API SOS rodando na porta ${env.port}`);
      console.log(`Servidor iniciado em: http://localhost:${env.port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();
