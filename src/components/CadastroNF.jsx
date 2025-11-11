// src/components/CadastroNF.jsx
import React, { useState } from 'react';

const CadastroNF = () => {
  const [form, setForm] = useState({
    numero_nf: '',
    fornecedor: '',
    valor_total: '',
    itens: [] // [{codigo, nome, qtd, preco_unit}]
  });
  const [itemTemp, setItemTemp] = useState({ codigo: '', nome: '', qtd: '', preco_unit: '' });

  const adicionarItem = () => {
    if (itemTemp.codigo && itemTemp.qtd) {
      setForm({
        ...form,
        itens: [...form.itens, { ...itemTemp, qtd: parseInt(itemTemp.qtd), preco_unit: parseFloat(itemTemp.preco_unit) }]
      });
      setItemTemp({ codigo: '', nome: '', qtd: '', preco_unit: '' });
    }
  };

  const removerItem = (index) => {
    setForm({
      ...form,
      itens: form.itens.filter((_, i) => i !== index)
    });
  };

  const salvarNF = async () => {
    if (!form.numero_nf || !form.fornecedor || form.itens.length === 0) {
      alert('Preencha todos os campos!');
      return;
    }

    const valor_total = form.itens.reduce((acc, item) => acc + (item.qtd * item.preco_unit), 0);

    await fetch('http://localhost:5000/api/nf-entrada', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numero_nf: form.numero_nf,
        fornecedor: form.fornecedor,
        valor_total,
        itens: form.itens
      })
    });

    alert('NF cadastrada com sucesso! Pode escanear para dar entrada.');
    setForm({ numero_nf: '', fornecedor: '', valor_total: '', itens: [] });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Cadastrar NF de Entrada</h2>

      <div style={{ marginBottom: '15px' }}>
        <input
          placeholder="Número da NF"
          value={form.numero_nf}
          onChange={(e) => setForm({ ...form, numero_nf: e.target.value })}
          style={{ width: '200px', padding: '8px', marginRight: '10px' }}
        />
        <input
          placeholder="Fornecedor"
          value={form.fornecedor}
          onChange={(e) => setForm({ ...form, fornecedor: e.target.value })}
          style={{ width: '300px', padding: '8px' }}
        />
      </div>

      <h4>Adicionar Item</h4>
      <div style={{ marginBottom: '10px' }}>
        <input
          placeholder="Código"
          value={itemTemp.codigo}
          onChange={(e) => setItemTemp({ ...itemTemp, codigo: e.target.value })}
          style={{ width: '120px', padding: '6px', marginRight: '5px' }}
        />
        <input
          placeholder="Nome"
          value={itemTemp.nome}
          onChange={(e) => setItemTemp({ ...itemTemp, nome: e.target.value })}
          style={{ width: '200px', padding: '6px', marginRight: '5px' }}
        />
        <input
          type="number"
          placeholder="Qtd"
          value={itemTemp.qtd}
          onChange={(e) => setItemTemp({ ...itemTemp, qtd: e.target.value })}
          style={{ width: '60px', padding: '6px', marginRight: '5px' }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="R$ Unit"
          value={itemTemp.preco_unit}
          onChange={(e) => setItemTemp({ ...itemTemp, preco_unit: e.target.value })}
          style={{ width: '80px', padding: '6px', marginRight: '5px' }}
        />
        <button onClick={adicionarItem} style={{ padding: '6px 10px' }}>+</button>
      </div>

      {form.itens.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', margin: '10px 0' }}>
          <thead>
            <tr style={{ background: '#f0f0f0' }}>
              <th>Código</th>
              <th>Nome</th>
              <th>Qtd</th>
              <th>R$ Unit</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form.itens.map((item, i) => (
              <tr key={i}>
                <td>{item.codigo}</td>
                <td>{item.nome}</td>
                <td>{item.qtd}</td>
                <td>R$ {item.preco_unit.toFixed(2)}</td>
                <td>R$ {(item.qtd * item.preco_unit).toFixed(2)}</td>
                <td>
                  <button onClick={() => removerItem(i)} style={{ color: 'red' }}>×</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        onClick={salvarNF}
        style={{ padding: '12px 24px', background: '#007bff', color: 'white', border: 'none', fontSize: '16px' }}
      >
        Salvar NF e Liberar para Entrada
      </button>
    </div>
  );
};

export default CadastroNF;