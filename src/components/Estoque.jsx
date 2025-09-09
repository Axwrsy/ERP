import React from 'react'
import { FaBell, FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";

import './css/Estoque.css'

const Estoque = () => {
    // exemplo de estoque (vai ser usado bd)
    const inventoryItems = [
      { id: 1, name: 'Product A', quantity: 150, price: 10.50, category: 'A' },
      { id: 2, name: 'Product B', quantity: 75, price: 22.00, category: 'B' },
      { id: 3, name: 'Product C', quantity: 200, price: 5.75, category: 'C' },
      { id: 4, name: 'Product D', quantity: 90, price: 15.20, category: 'D' },
      { id: 5, name: 'Product E', quantity: 120, price: 8.99, category: 'E' },
    ];
    return (
      <div className="main-container">
        {/* Top bar */}
        <div className="top-bar">
          <button className="icon-button">
            <FaPlus size={20} color="#333" />
          </button>
          <button className="icon-button">
            <FaBell size={20} color="#333" />
          </button>
          <div className="search-box">
            <FaSearch className="search-icon" size={16} color="#666" />
            <input type="text" placeholder="Pesquisar..." />
          </div>
        </div>
        {/* Inventory Table */}
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
              {inventoryItems.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>\${item.price.toFixed(2)}</td>
                  <td>{item.category}</td>
                  <td className="actions-cell">
                    <button className="action-button edit-button">
                      <FaEdit size={16} />
                    </button>
                    <button className="action-button delete-button">
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

export default Estoque
