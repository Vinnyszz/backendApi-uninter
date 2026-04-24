const express = require('express');
const router = express.Router();
const PedidoController = require('../controllers/PedidoController');
const { auth, authorize } = require('../middlewares/auth');

/**
 * @swagger
 * /pedidos:
 *   post:
 *     summary: Criar novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               canalPedido:
 *                 type: string
 *                 enum: [APP, TOTEM, BALCAO, WEB, PICKUP]
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     produtoId:
 *                       type: integer
 *                     quantidade:
 *                       type: integer
 *               formaPagamento:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post('/', auth, PedidoController.criar);

/**
 * @swagger
 * /pedidos:
 *   get:
 *     summary: Listar pedidos
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: canalPedido
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get('/', auth, PedidoController.listar);

router.get('/:id', auth, PedidoController.buscarPorId);
router.patch('/:id/status', auth, authorize('GERENTE', 'COZINHA', 'ADMIN'), PedidoController.atualizarStatus);
router.post('/:id/pagamento', auth, PedidoController.processarPagamento);

module.exports = router;