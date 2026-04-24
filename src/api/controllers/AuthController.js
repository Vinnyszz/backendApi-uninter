const AuthService = require('../../application/services/AuthService');

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(422).json({
          error: 'CAMPOS_OBRIGATORIOS',
          message: 'E-mail e senha são obrigatórios',
          details: [
            { field: 'email', issue: 'Campo obrigatório' },
            { field: 'senha', issue: 'Campo obrigatório' }
          ],
          timestamp: new Date().toISOString(),
          path: req.path
        });
      }

      const resultado = await AuthService.login(email, senha);
      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao processar login',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async registrar(req, res) {
    try {
      const { nome, email, senha, perfil } = req.body;

      if (!nome || !email || !senha) {
        return res.status(422).json({
          error: 'CAMPOS_OBRIGATORIOS',
          message: 'Nome, e-mail e senha são obrigatórios',
          details: [],
          timestamp: new Date().toISOString(),
          path: req.path
        });
      }

      const usuario = await AuthService.registrar(nome, email, senha, perfil);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao registrar usuário',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }
}

module.exports = new AuthController();