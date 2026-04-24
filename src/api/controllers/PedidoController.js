const PedidoService = require('../../application/services/PedidoService');
const PagamentoService = require('../../application/services/PagamentoService');

class PedidoController {
  async criar(req, res) {
    try {
      const { canalPedido, itens, formaPagamento } = req.body;
      const usuarioId = req.usuario.id;

      const pedido = await PedidoService.criarPedido(usuarioId, canalPedido, itens, formaPagamento);
      return res.status(201).json(pedido);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao criar pedido',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async listar(req, res) {
    try {
      const { canalPedido, status } = req.query;
      const pedidos = await PedidoService.listarPedidos({ canalPedido, status });
      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({
        error: 'ERRO_INTERNO',
        message: 'Erro ao listar pedidos',
        details: [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const pedido = await PedidoService.buscarPorId(id);
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao buscar pedido',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const pedido = await PedidoService.atualizarStatus(id, status);
      return res.status(200).json(pedido);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao atualizar status',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async processarPagamento(req, res) {
    try {
      const { id } = req.params;
      const pedido = await PedidoService.buscarPorId(id);

      const resultadoPagamento = await PagamentoService.processarPagamento(
        pedido.id,
        pedido.formaPagamento,
        pedido.total
      );

      if (resultadoPagamento.status === 'APROVADO') {
        await PedidoService.atualizarStatus(id, 'PAGO');
      }

      return res.status(200).json(resultadoPagamento);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao processar pagamento',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }
}

module.exports = new PedidoController();