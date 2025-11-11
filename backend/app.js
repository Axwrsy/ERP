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
//----------------------------------------------------------------
// 4. DAR ENTRADA NA NF -- CODIGO CERTOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
//----------------------------------------------------------------

// app.post('/api/nf-entrada/:id/entrada', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const nfResult = await pool.query('SELECT * FROM notas_entrada WHERE id = $1', [id]);
//     const nf = nfResult.rows[0];

//     if (nf.entrada_realizada) {
//       return res.json({ success: false, error: 'Entrada já realizada' });
//     }

//     const itens = nf.itens;
//     for (const item of itens) {
//       await pool.query(
//         `INSERT INTO itens_estoque (nome, codigo, quantidade, preco)
//          VALUES ($1, $2, $3, $4)
//          ON CONFLICT (codigo) DO UPDATE SET
//          quantidade = itens_estoque.quantidade + EXCLUDED.quantidade`,
//         [item.nome, item.codigo, item.qtd, item.preco_unit]
//       );
//     }

//     await pool.query('UPDATE notas_entrada SET entrada_realizada = TRUE WHERE id = $1', [id]);
//     res.json({ success: true, message: 'Entrada realizada com sucesso!' });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });

//----------------------------------------------------------------
//----------------------------------------------------------------

// 4. DAR ENTRADA NA NF (CORRIGIDA TESTEEEEEEEEE)
app.post('/api/nf-entrada/:id/entrada', async (req, res) => {
  const { id } = req.params;
  try {
    const nfResult = await pool.query('SELECT * FROM notas_entrada WHERE id = $1', [id]);
    if (nfResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'NF não encontrada' });
    }

    const nf = nfResult.rows[0];

    if (nf.entrada_realizada) {
      return res.json({ success: false, error: 'Entrada já realizada' });
    }

    // CORREÇÃO: CONVERTE ITENS COM SEGURANÇA
    let itens = [];
    try {
      itens = typeof nf.itens === 'string' ? JSON.parse(nf.itens) : nf.itens;
      if (!Array.isArray(itens)) itens = [];
    } catch (e) {
      console.error('ERRO AO LER ITENS:', e.message);
      itens = [];
    }

    if (itens.length === 0) {
      return res.status(400).json({ success: false, error: 'Nenhum item na NF' });
    }

    for (const item of itens) {
      const nome = item.nome || 'Sem nome';
      const codigo = item.codigo || 'SEM_CODIGO';
      const qtd = parseInt(item.qtd) || 0;
      const preco = parseFloat(item.preco_unit || 0) || 0;

      await pool.query(
        `INSERT INTO itens_estoque (nome, codigo, quantidade, preco)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (codigo) DO UPDATE SET
         quantidade = itens_estoque.quantidade + EXCLUDED.quantidade,
         preco = EXCLUDED.preco`,
        [nome, codigo, qtd, preco]
      );
    }

    await pool.query('UPDATE notas_entrada SET entrada_realizada = TRUE WHERE id = $1', [id]);
    console.log('ENTRADA REALIZADA COM SUCESSO!');
    res.json({ success: true, message: 'Entrada realizada com sucesso!' });
  } catch (err) {
    console.error('ERRO CRÍTICO NA ENTRADA:', err.message);
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

//2 NOVAS ROTAAAAAAAAAAAAS

// 6. PROGRAMAR PAGAMENTO DA NF
app.post('/api/nf-entrada/:id/programar-pagamento', async (req, res) => {
  const { id } = req.params;
  const { data_pagamento } = req.body;

  console.log('PROGRAMAR PAGAMENTO:', { id, data_pagamento }); //teste s evaaaaaaaaaaai

  if (!data_pagamento) {
    return res.status(400).json({ success: false, error: 'Data de pagamento é obrigatória' });
  }

  try {
    const result = await pool.query(
      `UPDATE notas_entrada 
       SET data_pagamento = $1, pago = FALSE 
       WHERE id = $2 AND entrada_realizada = TRUE 
       RETURNING *`,
      [data_pagamento, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'NF não encontrada ou entrada não realizada' });
    }

    console.log('PAGAMENTO PROGRAMADO:', result.rows[0]);
    res.json({ success: true, nf: result.rows[0] });
  } catch (err) {
    console.error('ERRO AO PROGRAMAR PAGAMENTO:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. MARCAR NF COMO PAGA
app.post('/api/nf-entrada/:id/marcar-pago', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE notas_entrada 
       SET pago = TRUE, data_pagamento_real = CURRENT_DATE 
       WHERE id = $1 
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'NF não encontrada' });
    }

    console.log('NF MARCADA COMO PAGA:', result.rows[0]);
    res.json({ success: true, nf: result.rows[0] });
  } catch (err) {
    console.error('ERRO AO MARCAR COMO PAGO:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

//rota NOVAAAAAAAAAAA
// 8. LISTAR CONTAS A PAGAR (CORRIGIDA PARA POSTGRESQL)
app.get('/api/contas-a-pagar', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, numero_nf, fornecedor, valor_total, 
        data_pagamento, pago, data_pagamento_real, entrada_realizada
      FROM notas_entrada 
      WHERE entrada_realizada = TRUE
      ORDER BY 
        (data_pagamento IS NULL) DESC,  -- Pendentes primeiro
        data_pagamento ASC,             -- Depois por data
        numero_nf
    `);
    res.json({ success: true, notas: result.rows });
  } catch (err) {
    console.error('ERRO AO LISTAR CONTAS:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});






// === SÓ DEPOIS DE TODAS AS ROTAS ===
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});