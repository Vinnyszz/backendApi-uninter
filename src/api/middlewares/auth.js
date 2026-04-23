const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'TOKEN_NAO_FORNECIDO',
        message: 'Token de autenticação não fornecido',
        details: [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'TOKEN_INVALIDO',
      message: 'Token inválido ou expirado',
      details: [],
      timestamp: new Date().toISOString(),
      path: req.path
    });
  }
};

const authorize = (...perfisPermitidos) => {
  return (req, res, next) => {
    if (!perfisPermitidos.includes(req.usuario.perfil)) {
      return res.status(403).json({
        error: 'ACESSO_NEGADO',
        message: 'Você não tem permissão para acessar este recurso',
        details: [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
    next();
  };
};

module.exports = { auth, authorize };