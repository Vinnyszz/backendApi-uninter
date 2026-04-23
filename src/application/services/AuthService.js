const jwt = require('jsonwebtoken');
const { Usuario } = require('../../domain/models');

class AuthService {
  async login(email, senha) {
    const usuario = await Usuario.findOne({ where: { email } });
    
    if (!usuario || !(await usuario.validarSenha(senha))) {
      throw { status: 401, error: 'CREDENCIAIS_INVALIDAS', message: 'E-mail ou senha inválidos' };
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, perfil: usuario.perfil },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 86400,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil
      }
    };
  }

  async registrar(nome, email, senha, perfil = 'CLIENTE') {
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    
    if (usuarioExistente) {
      throw { status: 409, error: 'USUARIO_JA_EXISTE', message: 'E-mail já cadastrado' };
    }

    const usuario = await Usuario.create({ nome, email, senha, perfil });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    };
  }
}

module.exports = new AuthService();