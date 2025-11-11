// src/components/ContasAPagar.jsx
import React, { useState, useEffect } from 'react';

const ContasAPagar = () => {
  const [notas, setNotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aba, setAba] = useState('agendadas');

  useEffect(() => {
    carregarContas();
  }, []);

  const carregarContas = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/contas-a-pagar');
      const data = await res.json();
      if (data.success) {
        setNotas(data.notas);
      }
    } catch (err) {
      alert('Erro ao carregar contas');
    } finally {
      setLoading(false);
    }
  };

  const marcarComoPago = async (id) => {
    if (!confirm('Confirmar pagamento?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/nf-entrada/${id}/marcar-pago`, {
        method: 'POST'
      });
      const data = await res.json();

      if (data.success) {
        carregarContas(); // atualiza lista
        alert('Pago com sucesso!');
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão');
    }
  };

  const formatar = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '—';
  const formatarValor = (v) => `R$ ${parseFloat(v).toFixed(2)}`;

  const pendentes = notas.filter(n => !n.data_pagamento);
  const agendadas = notas.filter(n => n.data_pagamento && !n.pago);
  const pagas = notas.filter(n => n.pago);

  const listaAtual = aba === 'pendentes' ? pendentes : aba === 'agendadas' ? agendadas : pagas;

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Notas fiscais a pagar</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setAba('pendentes')} style={btn(aba === 'pendentes')}>
          Pendentes ({pendentes.length})
        </button>
        <button onClick={() => setAba('agendadas')} style={btn(aba === 'agendadas')}>
          Agendadas ({agendadas.length})
        </button>
        <button onClick={() => setAba('pagas')} style={btn(aba === 'pagas')}>
          Pagas ({pagas.length})
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={th}>NF</th>
            <th style={th}>Fornecedor</th>
            <th style={th}>Valor</th>
            <th style={th}>Vencimento</th>
            <th style={th}>Pago em</th>
            <th style={th}>Ação</th>
          </tr>
        </thead>
        <tbody>
          {listaAtual.map(nf => (
            <tr key={nf.id} style={{ background: nf.pago ? '#e6f7e6' : '#fff' }}>
              <td style={td}>{nf.numero_nf}</td>
              <td style={td}>{nf.fornecedor}</td>
              <td style={td}>{formatarValor(nf.valor_total)}</td>
              <td style={td}>{formatar(nf.data_pagamento)}</td>
              <td style={td}>{formatar(nf.data_pagamento_real)}</td>
              <td style={td}>
                {aba === 'agendadas' && !nf.pago && (
                  <button
                    onClick={() => marcarComoPago(nf.id)}
                    style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px' }}
                  >
                    Marcar Pago
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {listaAtual.length === 0 && <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>
        Nenhuma NF nesta categoria.
      </p>}
    </div>
  );
};

const btn = (ativo) => ({
  padding: '10px 20px',
  background: ativo ? '#007bff' : '#f8f9fa',
  color: ativo ? 'white' : 'black',
  border: '1px solid #ddd',
  borderRadius: '5px',
  cursor: 'pointer'
});

const th = { border: '1px solid #ddd', padding: '12px', textAlign: 'center' };
const td = { border: '1px solid #ddd', padding: '10px', textAlign: 'center' };

export default ContasAPagar;