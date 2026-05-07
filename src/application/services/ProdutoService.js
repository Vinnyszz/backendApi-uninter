const { Produto } = require('../../domain/models');

class ProdutoService {
  async listarPorUnidade(unidadeId) {
    // retorna todos produtos
    const produtos = await Produto.findAll({
      where: { ativo: true }
    });
    
    return produtos;
  }

  async buscarPorId(id) {
    const produto = await Produto.findByPk(id);
    
    if (!produto) {
      throw { status: 404, error: 'PRODUTO_NAO_ENCONTRADO', message: 'Produto não encontrado' };
    }
    
    return produto;
  }
}

module.exports = new ProdutoService();