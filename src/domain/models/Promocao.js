const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const Promocao = sequelize.define('Promocao', {
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
  tipo: {
    type: DataTypes.ENUM('DESCONTO_PERCENTUAL', 'DESCONTO_FIXO', 'COMBO', 'FRETE_GRATIS'),
    defaultValue: 'DESCONTO_PERCENTUAL'
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2)
  },
  dataInicio: {
    type: DataTypes.DATE
  },
  dataFim: {
    type: DataTypes.DATE
  },
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'promocoes'
});

module.exports = Promocao;