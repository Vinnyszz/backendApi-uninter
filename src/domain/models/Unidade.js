const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const Unidade = sequelize.define('Unidade', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  endereco: {
    type: DataTypes.STRING
  },
  telefone: {
    type: DataTypes.STRING
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'unidades'
});

module.exports = Unidade;