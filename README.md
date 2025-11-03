# Projeto Estoque ERP

Projeto simples de controle de estoque com **backend em Node.js (Express)** e **frontend em React (Vite)**, utilizando **PostgreSQL** como banco de dados.

---

## Estrutura do Projeto
projeto-estoque/
├── backend/
│   ├── app.js
│   ├── .env
│   └── ...
├── frontend/
│   └── ...
└── README.md
text---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [PostgreSQL](https://www.postgresql.org/) instalado e em execução
- [psql](https://www.postgresql.org/docs/current/app-psql.html) (cliente de linha de comando do PostgreSQL)

---

## Configuração do Banco de Dados

### 1. Criar o banco de dados

```sql
CREATE DATABASE estoque_erp;
2. Conectar ao banco e criar a tabela
sql\c estoque_erp

CREATE TABLE itens_estoque (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL,
  preco DECIMAL(10, 2)
);
3. Verificar a tabela
sqlSELECT * FROM itens_estoque;

Backend - Configuração
1. Criar pasta do backend
bashmkdir backend
cd backend
2. Inicializar projeto Node.js
bashnpm init -y
3. Instalar dependências
bashnpm install express pg cors dotenv
4. Criar arquivo .env

Atenção: Este arquivo não deve ser versionado no Git.

envDB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=estoque_erp
PORT=5000

Dica: Se estiver com erro de conexão, acesse o psql e verifique/insira manualmente as credenciais:
bashpsql -U seu_usuario -d postgres
Depois preencha corretamente o .env.


Executar o Projeto
1. Backend
bashcd backend
node app.js

O servidor estará rodando em http://localhost:5000


2. Frontend
bashcd frontend
npm run dev

Acesse geralmente em http://localhost:5173




-Solução de Problemas Comuns
Erro no .env ou conexão com o banco

Verifique se o PostgreSQL está rodando:
bashsudo service postgresql status

Acesse o psql e teste a conexão:
bashpsql -U seu_usuario -d estoque_erp

Confirme que o .env está na raiz do backend/ e com os dados corretos.


Comandos Úteis
bash# Ver tabelas no banco
\dt

# Listar bancos
\l

# Ver estrutura da tabela
\d itens_estoque

Tecnologias Utilizadas

Backend: Node.js, Express, PostgreSQL
Frontend: React + Vite
Ferramentas: dotenv, cors, pg
