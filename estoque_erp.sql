CREATE TABLE itens_estoque (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  quantidade INTEGER NOT NULL,
  preco DECIMAL(10, 2)
);

SELECT * FROM  itens_estoque

INSERT INTO itens_estoque (nome, quantidade, preco) VALUES ('Produto teste1', 100, 15.50);
INSERT INTO itens_estoque (nome, quantidade, preco) VALUES ('Produto teste2', 50, 25.00);
INSERT INTO itens_estoque (nome, quantidade, preco) VALUES ('Produto teste3', 75, 8.75);