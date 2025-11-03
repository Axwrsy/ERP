const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(5000, () => console.log('Servidor na porta 5000')); // Confirme a porta