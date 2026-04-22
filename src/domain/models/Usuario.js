const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfil: {
    type: DataTypes.ENUM('CLIENTE', 'GERENTE', 'COZINHA', 'ADMIN'),
    defaultValue: 'CLIENTE'
  }
}, {
  tableName: 'usuarios',
  hooks: {
    beforeCreate: async (usuario) => {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }
  }
});

Usuario.prototype.validarSenha = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Usuario;