// src/components/EntradaNF.jsx
import React, { useState } from 'react';

const EntradaNF = () => {
  const [codigoNF, setCodigoNF] = useState('');
  const [nf, setNf] = useState(null);
  const [erro, setErro] = useState('');

  const buscarNF = async () => {
    if (!codigoNF) return;
    const res = await fetch(`http://localhost:5000/api/nf-entrada/${codigoNF}`);
    const data = await res.json();
    if (data.success) {
      setNf(data.nf);
      setErro('');
    } else {
      setErro(data.error);
      setNf(null);
    }
  };

  const darEntrada = async () => {
    const res = await fetch(`http://localhost:5000/api/nf-entrada/${nf.id}/entrada`, { method: 'POST' });
    const data = await res.json();
    if (data.success) {
      alert('Entrada realizada com sucesso!');
      setNf(null);
      setCodigoNF('');
    } else {
      alert('Erro: ' + data.error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>Entrada de Mercadoria via NF</h2>

      <input
        value={codigoNF}
        onChange={(e) => setCodigoNF(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && buscarNF()}
        placeholder="Escaneie o número da NF"
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
        autoFocus
      />

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      {nf && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h3>NF: {nf.numero_nf}</h3>
            <p><strong>Fornecedor:</strong> {nf.fornecedor}</p>
            <p><strong>Valor Total:</strong> R$ {parseFloat(nf.valor_total).toFixed(2)}</p>
            <p><strong>Itens:</strong></p>
            <ul>
            {nf.itens.map((item, i) => (
                <li key={i}>
                {item.nome} ({item.codigo}) - {item.qtd} un - R$ {parseFloat(item.preco_unit).toFixed(2)}
                </li>
            ))}
            </ul>
            <button 
            onClick={darEntrada} 
            style={{ 
                padding: '10px 20px', 
                background: '#28a745', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            >
            Dar Entrada no Estoque
            </button>
    </div>
)} {/* ← FECHOU O {nf && ( ... )} */}
    </div>
  );  {/* ← FECHOU O return ( ... ) */}
};

export default EntradaNF;