-- CRIA TABELAQ
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

UPDATE itens_estoque
SET quantidade = 60
WHERE id = 2;

ALTER TABLE itens_estoque ADD COLUMN IF NOT EXISTS codigo VARCHAR(50) UNIQUE;

--ATUALIZAR CODIGOS DOS PRODUTOS
UPDATE itens_estoque SET codigo = 'PROD001' WHERE id = 1;
UPDATE itens_estoque SET codigo = 'PROD002' WHERE id = 2;
UPDATE itens_estoque SET codigo = 'PROD003' WHERE id = 3;

-- Insere itens com códigos reais (exemplos)
INSERT INTO itens_estoque (nome, codigo, quantidade, preco) VALUES 
  ('Produto 4', '7891000055123', 10, 22.90),
  ('Produto 5', '7896003701234', 15, 8.50),
  ('Produto 6', '7896003705678', 8, 7.90)
ON CONFLICT (codigo) DO NOTHING;


--apagar item
DELETE FROM itens_estoque WHERE id = 2;
DELETE FROM itens_estoque WHERE id = 19;
DELETE FROM itens_estoque WHERE id = 20;
DELETE FROM itens_estoque WHERE id = 21;
DELETE FROM itens_estoque WHERE id = 23;
DELETE FROM itens_estoque WHERE id = 22;
DELETE FROM itens_estoque WHERE id = 24;
DELETE FROM itens_estoque WHERE id = 25;
DELETE FROM itens_estoque WHERE id = 14;
DELETE FROM itens_estoque WHERE id = 17;



CREATE TABLE notas_entrada (
  id SERIAL PRIMARY KEY,
  numero_nf VARCHAR(50) UNIQUE NOT NULL,
  fornecedor VARCHAR(100) NOT NULL,
  data_emissao DATE DEFAULT CURRENT_DATE,
  valor_total DECIMAL(10,2) NOT NULL,
  itens JSONB NOT NULL, -- ex: [{"codigo": "7891000055123", "nome": "product 2", "qtd": 10, "preco_unit": 22.90}]
  entrada_realizada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM notas_entrada ORDER BY id ASC; --ORDEM CRESCENTE

SELECT tablename FROM pg_tables WHERE schemaname = 'public';


--ACRESCENTAR MANUAL P TESTE
INSERT INTO notas_entrada (numero_nf, fornecedor, valor_total, itens) 
VALUES (
  '0034',
  'Distribuidora ABC',
  229.00,
  '[{"codigo": "7891000055123", "nome": "Produto 4", "qtd": 10, "preco_unit": 22.90}]'
)
RETURNING *;
SELECT entrada_realizada FROM notas_entrada WHERE numero_nf = '0034';


SELECT * FROM notas_entrada


--novo módulo
ALTER TABLE notas_entrada 
ADD COLUMN IF NOT EXISTS data_pagamento DATE,
ADD COLUMN IF NOT EXISTS pago BOOLEAN DEFAULT FALSE;


ALTER TABLE notas_entrada
DROP COLUMN data_pagamento


ALTER TABLE notas_entrada
DROP COLUMN pago


--TESTES NOVOS (ADCIONAR )
ALTER TABLE notas_entrada 
ADD COLUMN IF NOT EXISTS data_pagamento DATE,
ADD COLUMN IF NOT EXISTS pago BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS data_pagamento_real DATE;

SELECT numero_nf, data_pagamento, pago FROM notas_entrada WHERE numero_nf = '004';

SELECT * FROM notas_entrada
---apagar manualmente as q foi cadastrada errada no front (realizar pagamento)
DELETE FROM notas_entrada 
WHERE numero_nf IN ('0034', '004', '005');

DELETE FROM notas_entrada 
WHERE numero_nf IN ('022', '009', '003', '002');