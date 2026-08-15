const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('./middlewares/rateLimitMiddleware');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit);

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/prestadores', require('./routes/prestadorRoutes'));
app.use('/api/categorias', require('./routes/categoriaRoutes'));
app.use('/api/chamados', require('./routes/chamadoRoutes'));
app.use('/api/chamados/:id/avaliacao', require('./routes/avaliacaoRoutes'));

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API SOS funcionando', timestamp: new Date() });
});

// Middleware de erros global
app.use(errorMiddleware);

module.exports = app;
