// src/components/Estoque.jsx
import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import './css/Estoque.css';

const Estoque = () => {
  const [itens, setItens] = useState([]);
  const [barcode, setBarcode] = useState('');

  // Carrega itens
  useEffect(() => {
    fetch('http://localhost:5000/api/estoque')
      .then(res => res.json())
      .then(data => setItens(data))
      .catch(err => console.error('Erro ao carregar:', err));
  }, []);

  // Foco no input
  useEffect(() => {
    const input = document.getElementById('scanner-input');
    if (input) input.focus();
  }, []);

  // Captura scanner
  const handleScan = (e) => {
    if (e.key === 'Enter' && barcode) {
      enviarScan(barcode);
      setBarcode('');
    } else if (e.key.length === 1) {
      setBarcode(prev => prev + e.key);
    }
  };

  // Envia para backend
  const enviarScan = async (codigo) => {
    try {
      const res = await fetch('http://localhost:5000/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo })
      });
      const data = await res.json();

      if (data.success) {
        fetch('http://localhost:5000/api/estoque')
          .then(r => r.json())
          .then(setItens);
        alert(`Scan OK: ${data.item.nome || codigo} (${data.action === 'updated' ? 'atualizado' : 'criado'})`);
      } else {
        alert('Erro: ' + (data.error || 'Item não encontrado'));
      }
    } catch (err) {
      alert('Erro de conexão');
      console.error(err);
    }
  };

  return (
    <div className="main-container">
      {/* INPUT DE TESTE MANUAL PARA VER SE FUNCIONA */}
      {/* <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px' }}>
        <input
          id="scanner-input"
          value={barcode}
          onKeyDown={handleScan}
          placeholder="Digite código + Enter"
          style={{
            width: '300px',
            padding: '8px',
            fontSize: '16px',
            border: '2px solid #007bff',
            borderRadius: '4px'
          }}
          autoFocus
        />
        <p><strong>Código:</strong> {barcode || 'vazio'}</p>
      </div> */}

      <div className="top-bar">
        <button className="icon-button"><FaPlus size={20} color="#333" /></button>
        <button className="icon-button"><FaBell size={20} color="#333" /></button>
        <div className="search-box">
          <FaSearch className="search-icon" size={16} color="#666" />
          <input type="text" placeholder="Pesquisar..." />
        </div>
      </div>

      <div className="inventory-table-container">
        <h2>Monitoramento de estoque</h2>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Código</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Categoria</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            {itens.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nome}</td>
                <td>{item.codigo || '—'}</td>
                <td>{item.quantidade}</td>
                <td>${parseFloat(item.preco || 0).toFixed(2)}</td>
                <td>{item.category || 'N/A'}</td>
                <td className="actions-cell">
                  <button className="action-button edit-button"><FaEdit size={16} /></button>
                  <button className="action-button delete-button"><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Estoque;