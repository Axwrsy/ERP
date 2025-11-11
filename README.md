# ERP One – Sistema de Controle de Estoque e Entrada de Mercadorias

Um ERP simples, funcional e escalável para controle de estoque com entrada de mercadorias via **Nota Fiscal (NF)**.  
Desenvolvido com **Node.js**, **Express**, **PostgreSQL** e **React (Vite)**.

---

## Funcionalidades Atuais

| Módulo | Descrição | Status |
|-------|--------|-----------|
| **Cadastro de NF** | Usuário cadastra NF| OK |
| **Busca de NF por número** | Digita o número da NF e consegue visualizar detalhes e adcionar ao estoque | OK |
| **Dar entrada no estoque** | O estoque é atualizado automaticamente com base nos itens da NF | OK |
| **Controle de estoque** | Adiciona ou incrementa quantidade por código de barras usando o leitor de código de barras| OK |
| **Scan de produtos (venda)** | Simula leitura de código de barras (+1 na quantidade se escanear o mesmo produto 2 vezes) | OK |

---

## Tecnologias Utilizadas

### Backend
- **Node.js** + **Express**
- **PostgreSQL** (via `pg`)
- **CORS** habilitado

### Frontend
- **React** + **Vite**
- **JavaScript (sem TypeScript)**
- **CSS puro** (sem frameworks)

---

## Estrutura do Projeto
├── backend/
│   ├── app.js          ← Servidor principal
│   └── db.js           ← Configuração do PostgreSQL
├── src/
│   ├── components/
│   │   ├── CadastroNF.jsx
│   │   ├── EntradaNF.jsx
│   │   └── Estoque.jsx
│   └── App.jsx
├── public/
└── package.json

## Como Rodar o Projeto

### 1. Pré-requisitos

- **Node.js** (v18 ou superior)
- **PostgreSQL** (local ou remoto)
- **pgAdmin** (opcional, para gerenciar o banco)

---

### 2. Clone o repositório

```bash
git clone https://github.com/seu-usuario/erp-one.git
cd erp-one

3. Instale as dependências
--BackEnd
cd backend
npm install

--FrontEnd
cd ..
npm install


4. Configure o Banco de Dados
backend/db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'estoque_erp',
  password: 'sua_senha',
  port: 5432,
});

module.exports = pool;

5. Crie as Tabelas no PostgreSQL


6. Inicie os servidores
cd backend
node app.js

src --> npm run dev



Melhorias Futuras (Frontend)
O frontend está funcional, mas ainda precisa de melhorias:

 -Melhorias no UX/UI
 -Validação robusta de formulários
 -Responsividade para tablets e celulares
 -Feedback visual (loading, sucesso, erro)
 -Histórico das notas fiscais cadastradas
