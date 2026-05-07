const Usuario = require('./Usuario');
const Pedido = require('./Pedido');
const ItemPedido = require('./ItemPedido');
const Unidade = require('./Unidade');
const Produto = require('./Produto');
const Estoque = require('./Estoque');
const Fidelidade = require('./Fidelidade');
const Promocao = require('./Promocao');

//Relacionamentos:


// Usuario → Pedido
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Pedido → ItemPedido
Pedido.hasMany(ItemPedido, { foreignKey: 'pedidoId' });
ItemPedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// Unidade → Estoque
Unidade.hasMany(Estoque, { foreignKey: 'unidadeId' });
Estoque.belongsTo(Unidade, { foreignKey: 'unidadeId' });

// Produto → Estoque
Produto.hasMany(Estoque, { foreignKey: 'produtoId' });
Estoque.belongsTo(Produto, { foreignKey: 'produtoId' });

// Usuario → Fidelidade (1:1)
Usuario.hasOne(Fidelidade, { foreignKey: 'usuarioId' });
Fidelidade.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Pedido → Unidade (opcional: pedido feito em qual unidade?)
Pedido.belongsTo(Unidade, { foreignKey: 'unidadeId', allowNull: true });

module.exports = {
  Usuario,
  Pedido,
  ItemPedido,
  Unidade,
  Produto,
  Estoque,
  Fidelidade,
  Promocao
};