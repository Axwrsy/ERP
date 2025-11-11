// components/graficoVisao.jsx
import React from 'react';
import Header from './header';
import Grafico from './Grafico'; // Caminho correto

const GraficoVisao = () => {
  return (
    <div>
      <Header /> {/* Header no topo */}
      <div className="dashboard-content">
        <Grafico /> {/* Sem chaves! */}
      </div>
    </div>
  );
};

export default GraficoVisao;