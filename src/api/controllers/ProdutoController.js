const ProdutoService = require('../../application/services/ProdutoService');

class ProdutoController {
  async listar(req, res) {
    try {
      const { unidadeId } = req.query;
      const produtos = await ProdutoService.listarPorUnidade(unidadeId);
      return res.status(200).json(produtos);
    } catch (error) {
      return res.status(500).json({
        error: 'ERRO_INTERNO',
        message: 'Erro ao listar produtos',
        details: [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }

  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const produto = await ProdutoService.buscarPorId(id);
      return res.status(200).json(produto);
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.error || 'ERRO_INTERNO',
        message: error.message || 'Erro ao buscar produto',
        details: error.details || [],
        timestamp: new Date().toISOString(),
        path: req.path
      });
    }
  }
}

module.exports = new ProdutoController();