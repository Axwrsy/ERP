import React from 'react';
import Estoque from './Estoque';
import Header from './header';

const Overview = ({ children }) => {
  return (
    <div>
      <Header /> {/* Sempre no topo */}
      <div className="dashboard-content">
      {<Estoque/>} 
      </div>
    </div>
  );
};

export default Overview;
