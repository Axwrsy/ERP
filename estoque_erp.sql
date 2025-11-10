-- Tabela de itens no estoque
CREATE TABLE itens_estoque (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100),
  codigo VARCHAR(50) UNIQUE,
  quantidade INTEGER DEFAULT 0,
  preco DECIMAL(10,2) DEFAULT 0.00
);

-- Tabela de notas fiscais de entrada
CREATE TABLE notas_entrada (
  id SERIAL PRIMARY KEY,
  numero_nf VARCHAR(50) UNIQUE NOT NULL,
  fornecedor VARCHAR(100) NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  itens JSONB NOT NULL,
  entrada_realizada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);