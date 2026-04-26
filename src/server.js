require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./infrastructure/database/database');
const { swaggerUi, specs } = require('./infrastructure/config/swagger');

// Importar models para sincronizar
require('./domain/models');

// Rotas
const authRoutes = require('./api/routes/auth.routes');
const pedidoRoutes = require('./api/routes/pedido.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas
app.use('/auth', authRoutes);
app.use('/pedidos', pedidoRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Lanchonete funcionando! Acesse /api-docs para documentação' });
});

// Sincronizar banco e iniciar servidor
sequelize.sync({ force: false }).then(() => {
  console.log('✅ Banco de dados sincronizado');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação: http://localhost:${PORT}/api-docs`);
  });
});