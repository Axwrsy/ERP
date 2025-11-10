const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// === TODAS AS ROTAS AQUI ===

// 1. ESTOQUE
app.get('/api/estoque', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM itens_estoque');
    console.log('Dados do banco:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Erro na query:', err);
    res.status(500).send('Erro');
  }
});

// 2. SCAN DE PRODUTO
app.post('/api/scan', async (req, res) => {
  console.log('SCAN:', req.body);
  const { codigo } = req.body;

  if (!codigo || codigo.trim() === '') {
    return res.status(400).json({ success: false, error: 'Código vazio' });
  }

  const codigoLimpo = codigo.trim();

  try {
    const result = await pool.query(
      'SELECT * FROM itens_estoque WHERE codigo = $1',
      [codigoLimpo]
    );

    let item;
    let action;

    if (result.rows.length > 0) {
      await pool.query(
        'UPDATE itens_estoque SET quantidade = quantidade + 1 WHERE codigo = $1',
        [codigoLimpo]
      );
      const updated = await pool.query(
        'SELECT * FROM itens_estoque WHERE codigo = $1',
        [codigoLimpo]
      );
      item = updated.rows[0];
      action = 'updated';
    } else {
      const newItem = await pool.query(
        'INSERT INTO itens_estoque (nome, codigo, quantidade, preco) VALUES ($1, $1, 1, 0.00) RETURNING *',
        [codigoLimpo]
      );
      item = newItem.rows[0];
      action = 'created';
    }

    const nomeExibido = item.nome || codigoLimpo;

    res.json({
      success: true,
      item: { ...item, nome: nomeExibido },
      action
    });

  } catch (err) {
    console.error('ERRO NO SCAN:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. BUSCAR NF PELO NÚMERO
app.get('/api/nf-entrada/:numero', async (req, res) => {
  const { numero } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM notas_entrada WHERE numero_nf = $1',
      [numero]
    );
    if (result.rows.length > 0) {
      res.json({ success: true, nf: result.rows[0] });
    } else {
      res.json({ success: false, error: 'NF não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. DAR ENTRADA NA NF
app.post('/api/nf-entrada/:id/entrada', async (req, res) => {
  const { id } = req.params;
  try {
    const nfResult = await pool.query('SELECT * FROM notas_entrada WHERE id = $1', [id]);
    const nf = nfResult.rows[0];

    if (nf.entrada_realizada) {
      return res.json({ success: false, error: 'Entrada já realizada' });
    }

    const itens = (nf.itens); //aq ja eh um json
    for (const item of itens) {
      await pool.query(
        `INSERT INTO itens_estoque (nome, codigo, quantidade, preco)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (codigo) DO UPDATE SET
         quantidade = itens_estoque.quantidade + EXCLUDED.quantidade`,
        [item.nome, item.codigo, item.qtd, item.preco_unit]
      );
    }

    await pool.query('UPDATE notas_entrada SET entrada_realizada = TRUE WHERE id = $1', [id]);
    res.json({ success: true, message: 'Entrada realizada com sucesso!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. CADASTRAR NF DE ENTRADA (COM LOGS)
app.post('/api/nf-entrada', async (req, res) => {
  console.log('RECEBIDO: POST /api/nf-entrada');
  console.log('Corpo da requisição:', req.body);

  const { numero_nf, fornecedor, valor_total, itens } = req.body;

  if (!numero_nf || !fornecedor || !itens || itens.length === 0) {
    console.log('ERRO: Dados incompletos');
    return res.status(400).json({ success: false, error: 'Dados incompletos' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO notas_entrada 
       (numero_nf, fornecedor, valor_total, itens) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [numero_nf, fornecedor, valor_total, JSON.stringify(itens)]
    );
    console.log('NF CADASTRADA COM SUCESSO:', result.rows[0]);
    res.json({ success: true, nf: result.rows[0] });
  } catch (err) {
    console.error('ERRO NO BANCO:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// === SÓ DEPOIS DE TODAS AS ROTAS ===
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});