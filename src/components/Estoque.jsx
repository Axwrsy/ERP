import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import './css/Estoque.css';

const Estoque = () => {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/estoque')
      .then(res => res.json())
      .then(data => setItens(data))
      .catch(error => console.error('Erro ao buscar estoque:', error));
  }, []);

  return (
    <div className="main-container">
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
                <td>{item.nome}</td> {/* Corrigido de 'name' para 'nome', já que o banco usa 'nome' */}
                <td>{item.quantidade}</td>
                <td>${parseFloat(item.preco).toFixed(2)}</td> {/* Converte para número */}
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