const sequelize = require('./database');
const { Usuario, Pedido, ItemPedido } = require('../../domain/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('🗑️ Banco resetado');

    // Criar usuários
    const cliente = await Usuario.create({
      nome: 'João Cliente',
      email: 'cliente@teste.com',
      senha: 'Senha@123',
      perfil: 'CLIENTE'
    });

    const gerente = await Usuario.create({
      nome: 'Maria Gerente',
      email: 'gerente@teste.com',
      senha: 'Senha@123',
      perfil: 'GERENTE'
    });

    console.log('✅ Usuários criados');
    console.log('📧 Login Cliente: cliente@teste.com | Senha: Senha@123');
    console.log('📧 Login Gerente: gerente@teste.com | Senha: Senha@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
}

seed();