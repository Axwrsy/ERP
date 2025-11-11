// src/components/Pagamento.jsx
import React, { useState } from 'react';

const Pagamento = () => {
  const [numeroNF, setNumeroNF] = useState('');
  const [nf, setNf] = useState(null);
  const [dataPagamento, setDataPagamento] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const buscarNF = async () => {
    if (!numeroNF.trim()) return;

    try {
      const res = await fetch(`http://localhost:5000/api/nf-entrada/${numeroNF}`);
      const data = await res.json();

      if (data.success) {
        if (!data.nf.entrada_realizada) {
          setErro('A entrada no estoque ainda não foi realizada!');
          setNf(null);
        } else {
          setNf(data.nf);
          setErro('');
          setSucesso('');
        }
      } else {
        setErro('NF não encontrada');
        setNf(null);
      }
    } catch (err) {
      setErro('Erro de conexão');
    }
  };

  const programarPagamento = async () => {
    if (!dataPagamento) {
      alert('Selecione a data de pagamento');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/nf-entrada/${nf.id}/programar-pagamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data_pagamento: dataPagamento })
      });

      const data = await res.json();
      if (data.success) {
        setSucesso('Pagamento programado para ' + new Date(dataPagamento).toLocaleDateString('pt-BR'));
        setNf(data.nf);
      } else {
        alert('Erro: ' + data.error);
      }
    } catch (err) {
      alert('Erro de conexão');
    }
  };

  const formatarData = (d) => d ? new Date(d).toLocaleDateString('pt-BR') : '—';

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Programar Pagamento da NF</h2>

      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Digite o número da NF"
          value={numeroNF}
          onChange={(e) => setNumeroNF(e.target.value)}
          style={{ padding: '10px', width: '250px', marginRight: '10px' }}
        />
        <button onClick={buscarNF} style={{ padding: '10px 20px' }}>
          Buscar NF
        </button>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      {nf && (
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <h3>NF: {nf.numero_nf}</h3>
          <p><strong>Fornecedor:</strong> {nf.fornecedor}</p>
          <p><strong>Valor Total:</strong> R$ {parseFloat(nf.valor_total).toFixed(2)}</p>
          <p><strong>Entrada Realizada:</strong> Sim</p>
          <p><strong>Pagamento Programado:</strong> {formatarData(nf.data_pagamento)}</p>
          <p><strong>Pago em:</strong> {formatarData(nf.data_pagamento_real)}</p>

          {!nf.data_pagamento && (
            <div style={{ marginTop: '20px' }}>
              <label><strong>Programar para:</strong></label><br/>
              <input
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
                style={{ padding: '8px', marginTop: '5px' }}
              />
              <button
                onClick={programarPagamento}
                style={{ padding: '10px 20px', background: '#28a745', color: 'white', marginLeft: '10px' }}
              >
                Programar Pagamento
              </button>
            </div>
          )}

          {nf.data_pagamento && !nf.pago && (
            <p style={{ color: '#007bff', fontWeight: 'bold', marginTop: '20px' }}>
              Aguardando pagamento em {formatarData(nf.data_pagamento)}
            </p>
          )}

          {nf.pago && (
            <p style={{ color: 'green', fontWeight: 'bold', marginTop: '20px' }}>
              Pago em {formatarData(nf.data_pagamento_real)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagamento;