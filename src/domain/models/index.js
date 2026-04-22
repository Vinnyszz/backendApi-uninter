const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');

// Relacionamentos
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

module.exports = {
  Usuario,
  Pedido,
  ItemPedido
};