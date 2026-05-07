const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Listar produtos (cardápio)
 *     tags: [Produtos]
 *     parameters:
 *       - in: query
 *         name: unidadeId
 *         schema:
 *           type: integer
 *         description: Filtrar por unidade
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);

module.exports = router;