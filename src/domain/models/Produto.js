const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const Produto = sequelize.define('Produto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  categoria: {
    type: DataTypes.ENUM('LANCHE', 'BEBIDA', 'SOBREMESA', 'ACOMPANHAMENTO'),
    defaultValue: 'LANCHE'
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'produtos'
});

module.exports = Produto;