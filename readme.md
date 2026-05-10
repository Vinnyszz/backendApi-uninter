## Sobre o Projeto

Este projeto implementa uma **API REST completa** para gerenciamento de pedidos em uma rede de lanchonetes, contemplando:

- ✅ **Multicanalidade**: Rastreamento de pedidos por canal (APP, TOTEM, BALCÃO, WEB, PICKUP)
- ✅ **Autenticação JWT**: Controle de acesso com perfis (CLIENTE, GERENTE, COZINHA, ADMIN)
- ✅ **Gestão de Pedidos**: Ciclo completo do pedido (criação → pagamento → preparação → entrega)
- ✅ **Pagamento Mock**: Simulação de gateway de pagamento
- ✅ **Cardápio por Unidade**: Produtos com controle de estoque por localidade
- ✅ **Programa de Fidelidade**: Acúmulo de pontos (conceitual)
- ✅ **Arquitetura em Camadas**: Separação clara de responsabilidades
- ✅ **Documentação Swagger**: Interface interativa para testes

---

## Funcionalidades

### Implementadas (MVP)

#### **Autenticação e Autorização**
- Cadastro de usuários com perfis diferenciados
- Login com geração de token JWT (expiração 24h)
- Proteção de rotas por autenticação
- Controle de acesso por perfil

#### **Gestão de Pedidos**
- Criar pedido com validação de canal obrigatório
- Listar pedidos com filtros (canal, status, unidade)
- Buscar pedido por ID
- Atualizar status do pedido (apenas GERENTE/COZINHA/ADMIN)
- Rastreabilidade por canal (multicanalidade)

#### **Produtos e Cardápio**
- Listar produtos disponíveis (cardápio)
- Buscar produto por ID
- Categorização (LANCHE, BEBIDA, SOBREMESA, ACOMPANHAMENTO)
- Controle de produtos ativos/inativos

#### **Pagamento**
- Simulação de processamento via gateway mock
- 70% de aprovação / 30% de recusa (aleatório)
- Atualização automática de status do pedido

#### **Gestão de Unidades**
- Cadastro de unidades da rede
- Controle de unidades ativas/inativas
- Associação de pedidos com unidades

### Conceituais (Estrutura Implementada, Lógica Simplificada)

#### **Controle de Estoque**
- Tabela de estoque por unidade
- Relacionamento Produto ↔ Unidade
- Validação de disponibilidade (conceitual)

#### **Programa de Fidelidade**
- Cadastro de pontos por cliente
- Consentimento LGPD
- Acúmulo automático (conceitual: R$ 10 = 1 ponto)

#### **Promoções**
- Cadastro de campanhas
- Tipos: desconto percentual, fixo, combo
- Vigência por data

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| **Node.js** | 18+ | Plataforma runtime |
| **Express.js** | 4.x | Framework web |
| **Sequelize** | 6.x | ORM (mapeamento objeto-relacional) |
| **SQLite** | 3.x | Banco de dados |
| **JWT (jsonwebtoken)** | 9.x | Autenticação |
| **Bcrypt.js** | 2.x | Hash de senhas |
| **Swagger UI Express** | 5.x | Documentação interativa |
| **Swagger JSDoc** | 6.x | Geração de spec OpenAPI |
| **dotenv** | 16.x | Variáveis de ambiente |
| **CORS** | 2.x | Controle de acesso cross-origin |

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior
  - Verifique: `node --version`
  - Download: https://nodejs.org/

- **npm** (gerenciador de pacotes - vem com Node.js)
  - Verifique: `npm --version`

- **Git** (opcional, para clonar o repositório)
  - Verifique: `git --version`

---

## Instalação

### Passo 1: Obter o Projeto

**Opção A - Clonar via Git:**
```bash
git clone 
cd 
```

**Opção B - Download ZIP:**
1. Baixe o projeto
2. Extraia o ZIP
3. Navegue até a pasta no terminal

---

### Passo 2: Instalar Dependências

```bash
npm install
```

**O que será instalado:**
- express
- sequelize, sqlite3
- jsonwebtoken, bcryptjs
- swagger-ui-express, swagger-jsdoc
- dotenv, cors

---

## ⚙️ Configuração

### Passo 1: Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=3000
JWT_SECRET=sua_chave_secreta_super_segura_troque_em_producao_12345
NODE_ENV=development
```

### Passo 2: Popular o Banco de Dados (Seed)

Execute o script de seed para criar:
- 2 usuários de teste (cliente e gerente)
- 2 unidades (Centro e Shopping)
- 3 produtos (X-Burger, Refrigerante, Batata Frita)
- Estoque inicial por unidade
- Registro de fidelidade para o cliente
- 1 promoção exemplo

```bash
node src/infrastructure/database/seed.js
```

Usuários de teste:
Cliente: cliente@teste.com | Senha: Senha@123
Gerente: gerente@teste.com | Senha: Senha@123


## ▶️ Como Executar

### Iniciar o Servidor

```bash
npm run start
```

**O servidor estará disponível em:** `http://localhost:3000`

---

### Verificar se Está Funcionando

**Opção 1 - Navegador:**
Acesse: http://localhost:3000

**Resposta esperada:**
```json
{
  "message": "API Lanchonete funcionando! Acesse /api-docs para documentação"
}
```

## 📚 Documentação da API

### Swagger/OpenAPI (Interativo)

Acesse a documentação interativa completa:
http://localhost:3000/api-docs


### Como Testar no Swagger

1. **Fazer Login:**
   - Acesse `POST /auth/login`
   - Clique em "Try it out"
   - Use:
```json
     {
       "email": "cliente@teste.com",
       "senha": "Senha@123"
     }
```
   - Clique em "Execute"
   - **Copie o `accessToken` retornado**

2. **Autenticar:**
   - Clique no botão **"Authorize"** (cadeado no topo)
   - Cole: `Bearer {seu-token-aqui}`
   - Clique em "Authorize"

3. **Testar Endpoints Protegidos:**
   - Agora você pode testar `POST /pedidos`, `GET /pedidos`, etc.

---

## 🧪 Como Testar

### Postman/Insomnia

#### **Passo 1: Importar Coleção**

1. Abra o Postman
2. Clique em **"Import"**
3. Selecione o arquivo `postman_collection.json` (na raiz do projeto)
4. A coleção "API Lanchonete - Projeto Back-End" será carregada

#### **Passo 2: Executar Testes**

**IMPORTANTE:** Execute os testes **NA ORDEM** (as variáveis dependem umas das outras)

**Sequência:**

1. **Auth/T01 - Login válido**
   - Salva o token automaticamente
   - Status esperado: `200 OK`

2. **Auth/T02 - Login senha inválida**
   - Testa validação
   - Status esperado: `401 Unauthorized`

3. **Auth/T03 - Registrar novo usuário**
   - Cria usuário
   - Status esperado: `201 Created`

4. **Auth/T04 - Email duplicado**
   - Testa constraint UNIQUE
   - Status esperado: `409 Conflict`

5. **Pedidos/T05 - Criar pedido válido**
   - Salva pedidoId automaticamente
   - Status esperado: `201 Created`
   - Verifica campo `canalPedido: "TOTEM"`

6. **Pedidos/T06 - Sem token**
   - Testa autenticação
   - Status esperado: `401 Unauthorized`

7. **Pedidos/T07 - Canal inválido**
   - Testa validação de ENUM
   - Status esperado: `422 Unprocessable Entity`

8. **Pedidos/T08 - Listar pedidos**
   - Busca todos os pedidos
   - Status esperado: `200 OK`

9. **Pedidos/T09 - Filtrar por canal**
   - Testa query param `?canalPedido=TOTEM`
   - Status esperado: `200 OK`

10. **Pedidos/T10 - Processar pagamento**
    - Simula gateway mock
    - Status esperado: `200 OK`
    - Resultado: `APROVADO` (70%) ou `RECUSADO` (30%)

11. **Produtos/T11 - Listar produtos**
    - Retorna cardápio
    - Status esperado: `200 OK`

---

## 📂 Estrutura do Projeto
projeto-lanchonete/
│
├── src/
│   ├── api/                          # Camada de Interface 
│   │   ├── controllers/              # Orquestradores de requisições
│   │   │   ├── AuthController.js
│   │   │   ├── PedidoController.js
│   │   │   └── ProdutoController.js
│   │   ├── routes/                   # Definição de rotas
│   │   │   ├── auth.routes.js
│   │   │   ├── pedido.routes.js
│   │   │   └── produto.routes.js
│   │   └── middlewares/              # Autenticação e Autorização
│   │       └── auth.js
│   │
│   ├── application/                  # Camada de Lógica de Negócio
│   │   └── services/
│   │       ├── AuthService.js        # Login, registro, JWT
│   │       ├── PedidoService.js      # CRUD pedidos + validações
│   │       ├── PagamentoService.js   # Mock de gateway
│   │       ├── ProdutoService.js     # Cardápio e produtos
│   │       ├── FidelidadeService.js  # Pontos
│   │       └── EstoqueService.js     # Validações 
│   │
│   ├── domain/                       # Camada de Domínio
│   │   └── models/
│   │       ├── Usuario.js            # Model + hash de senha
│   │       ├── Pedido.js             # + campo canalPedido
│   │       ├── ItemPedido.js
│   │       ├── Unidade.js
│   │       ├── Produto.js
│   │       ├── Estoque.js
│   │       ├── Fidelidade.js
│   │       ├── Promocao.js
│   │       └── index.js              # Relacionamentos
│   │
│   └── infrastructure/               # Camada de Infraestrutura
│       ├── database/
│       │   ├── database.js           # Configuração Sequelize
│       │   └── seed.js               # Dados iniciais
│       └── config/
│           └── swagger.js            # Documentação OpenAPI
│
├── server.js                         # Ponto de entrada
├── package.json                      # Dependências
├── .env                              # Variáveis de ambiente
├── .env.example                      # Template de .env
├── .gitignore                        # Arquivos ignorados pelo git
├── postman_collection.json           # Coleção de testes
├── README.md                         # Este arquivo


## 🔐 Segurança e LGPD

### Medidas de Segurança Implementadas

#### **1. Autenticação JWT**
- Token gerado após login bem-sucedido
- Expiração: 24 horas
- Payload: `{ id, email, perfil }`
- Secret armazenado em variável de ambiente

#### **2. Hash de Senhas (Bcrypt)**
- Senhas **NUNCA** armazenadas em texto puro
- Hash irreversível com salt automático (10 rounds)
- Exemplo:
  - Entrada: `Senha@123`
  - Armazenado: `$2b$10$xyz...abc` (60 caracteres)

#### **3. Autorização por Perfis (RBAC)**
```javascript
// Exemplo: apenas GERENTE e COZINHA podem atualizar status
router.patch('/:id/status', auth, authorize('GERENTE', 'COZINHA'), ...)
```

#### **4. Validação de Entrada**
- Campos obrigatórios verificados
- Tipos validados (email, ENUM, números)
- Proteção contra SQL Injection (ORM Sequelize)


#### **Não Implementado (Fora do Escopo MVP)**

⚠️ **Logs de Auditoria:**
- Rastreamento de acessos a dados sensíveis
- Registro de consentimentos e revogações


## 🐛 Troubleshooting

### Problema: "Cannot find module"

**Causa:** Dependências não instaladas

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```



## Autor

**Nome:** Vinícius de Oliveira Prudente  
**RU:** 4747634  
**Curso:** Análise e Desenvolvimento de Sistemas  
**Disciplina:** Projeto Multidisciplinar - Trilha Back-End  
**Instituição:** UNINTER  
**Ano:** 2026


## 📄 Licença

Este projeto é acadêmico e foi desenvolvido para fins educacionais.

---