const { Pedido, ItemPedido, Usuario } = require('../../domain/models');

class PedidoService {
  async criarPedido(usuarioId, canalPedido, itens, formaPagamento) {
    // Validação do canal
    const canaisValidos = ['APP', 'TOTEM', 'BALCAO', 'WEB', 'PICKUP'];
    if (!canaisValidos.includes(canalPedido)) {
      throw { 
        status: 422, 
        error: 'CANAL_INVALIDO', 
        message: 'Canal de pedido inválido',
        details: [{ field: 'canalPedido', issue: `Deve ser um de: ${canaisValidos.join(', ')}` }]
      };
    }

    // Validação dos itens
    if (!itens || itens.length === 0) {
      throw { 
        status: 422, 
        error: 'ITENS_OBRIGATORIOS', 
        message: 'O pedido deve conter pelo menos um item',
        details: [{ field: 'itens', issue: 'Lista de itens não pode estar vazia' }]
      };
    }

    // Calcular total
    let total = 0;
    const itensPedido = [];

    for (const item of itens) {
      const precoUnitario = 25.90; // Mock 
      const subtotal = precoUnitario * item.quantidade;
      total += subtotal;

      itensPedido.push({
        produtoNome: `Produto ${item.produtoId}`, // Mock
        quantidade: item.quantidade,
        precoUnitario
      });
    }

    // Criar pedido
    const pedido = await Pedido.create({
      usuarioId,
      canalPedido,
      status: 'AGUARDANDO_PAGAMENTO',
      total,
      formaPagamento
    });

    // Criar itens
    for (const item of itensPedido) {
      await ItemPedido.create({
        pedidoId: pedido.id,
        ...item
      });
    }

    return {
      pedidoId: pedido.id,
      status: pedido.status,
      canalPedido: pedido.canalPedido,
      total: parseFloat(pedido.total),
      itens: itensPedido,
      createdAt: pedido.createdAt
    };
  }

  async listarPedidos(filtros = {}) {
    const where = {};
    
    if (filtros.canalPedido) {
      where.canalPedido = filtros.canalPedido;
    }
    
    if (filtros.status) {
      where.status = filtros.status;
    }

    const pedidos = await Pedido.findAll({
      where,
      include: [
        { model: ItemPedido },
        { model: Usuario, attributes: ['id', 'nome', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    return pedidos;
  }

  async buscarPorId(id) {
    const pedido = await Pedido.findByPk(id, {
      include: [
        { model: ItemPedido },
        { model: Usuario, attributes: ['id', 'nome', 'email'] }
      ]
    });

    if (!pedido) {
      throw { status: 404, error: 'PEDIDO_NAO_ENCONTRADO', message: 'Pedido não encontrado' };
    }

    return pedido;
  }

  async atualizarStatus(id, novoStatus) {
    const pedido = await Pedido.findByPk(id);

    if (!pedido) {
      throw { status: 404, error: 'PEDIDO_NAO_ENCONTRADO', message: 'Pedido não encontrado' };
    }

    pedido.status = novoStatus;
    await pedido.save();

    return pedido;
  }
}

module.exports = new PedidoService();