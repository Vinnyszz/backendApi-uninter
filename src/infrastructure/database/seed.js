const sequelize = require('./database');
const { Usuario, Unidade, Produto, Estoque, Fidelidade, Promocao } = require('../../domain/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log('Banco resetado');

    // Usuários
    const cliente = await Usuario.create({
      nome: 'João Cliente',
      email: 'cliente@teste.com',
      senha: 'Senha@123',
      perfil: 'CLIENTE',
      consentimentoLGPD: true
    });

    const gerente = await Usuario.create({
      nome: 'Maria Gerente',
      email: 'gerente@teste.com',
      senha: 'Senha@123',
      perfil: 'GERENTE',
      consentimentoLGPD: true
    });

    console.log('Usuários criados');

    // Unidades
    const unidade1 = await Unidade.create({
      nome: 'Lanchonete Centro',
      endereco: 'Rua Principal, 123',
      telefone: '(00) 90000-0000',
      ativa: true
    });

    const unidade2 = await Unidade.create({
      nome: 'Lanchonete Shopping',
      endereco: 'Shopping Center, Loja 45',
      telefone: '(00) 90000-0001',
      ativa: true
    });

    console.log('Unidades criadas');

    // Produtos
    const prod1 = await Produto.create({
      nome: 'X-Burger Clássico',
      descricao: 'Hambúrguer 180g, queijo, alface, tomate',
      preco: 25.90,
      categoria: 'LANCHE',
      ativo: true
    });

    const prod2 = await Produto.create({
      nome: 'Refrigerante Lata',
      descricao: 'Refrigerante gelado 350ml',
      preco: 5.00,
      categoria: 'BEBIDA',
      ativo: true
    });

    const prod3 = await Produto.create({
      nome: 'Batata Frita',
      descricao: 'Porção individual 200g',
      preco: 12.00,
      categoria: 'ACOMPANHAMENTO',
      ativo: true
    });

    console.log('Produtos criados');

    // Estoque
    await Estoque.create({ unidadeId: unidade1.id, produtoId: prod1.id, quantidade: 50 });
    await Estoque.create({ unidadeId: unidade1.id, produtoId: prod2.id, quantidade: 100 });
    await Estoque.create({ unidadeId: unidade1.id, produtoId: prod3.id, quantidade: 30 });

    await Estoque.create({ unidadeId: unidade2.id, produtoId: prod1.id, quantidade: 40 });
    await Estoque.create({ unidadeId: unidade2.id, produtoId: prod2.id, quantidade: 80 });
    await Estoque.create({ unidadeId: unidade2.id, produtoId: prod3.id, quantidade: 25 });

    console.log('Estoque criado');

    // Fidelidade
    await Fidelidade.create({
      usuarioId: cliente.id,
      pontos: 150,
      consentimento: true
    });

    console.log('Fidelidade criada');

    // Promoção (exemplo)
    await Promocao.create({
      nome: 'Combo Especial',
      descricao: 'X-Burger + Batata + Refri por R$ 35,00',
      tipo: 'DESCONTO_FIXO',
      valor: 7.90,
      dataInicio: new Date(),
      dataFim: new Date(Date.now() + 30*24*60*60*1000), // 30 dias
      ativa: true
    });

    console.log('Promoção criada');

    console.log('\n Usuários de teste:');
    console.log('   Cliente: cliente@teste.com | Senha: Senha@123');
    console.log('   Gerente: gerente@teste.com | Senha: Senha@123');

    process.exit(0);
  } catch (error) {
    console.error('Erro ao popular banco:', error);
    process.exit(1);
  }
}

seed();