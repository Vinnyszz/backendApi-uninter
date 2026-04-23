class PagamentoService {
  async processarPagamento(pedidoId, formaPagamento, valor) {
    // Simula processamento (70% aprovado, 30% recusado)
    const aprovado = Math.random() > 0.3;

    // Simula delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      pagamentoId: `PAG-${Date.now()}`,
      pedidoId,
      status: aprovado ? 'APROVADO' : 'RECUSADO',
      valor,
      formaPagamento,
      mensagem: aprovado ? 'Pagamento aprovado com sucesso' : 'Pagamento recusado',
      dataProcessamento: new Date().toISOString()
    };
  }
}

module.exports = new PagamentoService();