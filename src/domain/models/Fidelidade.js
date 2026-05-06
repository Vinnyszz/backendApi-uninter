const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const Fidelidade = sequelize.define('Fidelidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pontos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  consentimento: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Consentimento LGPD para programa de fidelidade'
  }
}, {
  tableName: 'fidelidades'
});

module.exports = Fidelidade;