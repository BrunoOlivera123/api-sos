const { verifyToken } = require('../utils/jwt');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    req.user = decoded; // { id, tipo: 'CLIENTE' | 'PRESTADOR' }
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Não autorizado. Token inválido ou expirado.' });
  }
};
