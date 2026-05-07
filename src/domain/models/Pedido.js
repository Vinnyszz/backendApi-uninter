const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');

const Pedido = sequelize.define('Pedido', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unidadeId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Unidade onde o pedido foi realizado'
  },
  canalPedido: {
    type: DataTypes.ENUM('APP', 'TOTEM', 'BALCAO', 'WEB', 'PICKUP'),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('AGUARDANDO_PAGAMENTO', 'PAGO', 'EM_PREPARACAO', 'PRONTO', 'ENTREGUE', 'CANCELADO'),
    defaultValue: 'AGUARDANDO_PAGAMENTO'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  formaPagamento: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'pedidos'
});

module.exports = Pedido;