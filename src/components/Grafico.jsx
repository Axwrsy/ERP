// components/Grafico.jsx
import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { FaBell, FaPlus, FaSearch } from "react-icons/fa";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

// COMPONENTE CHAMADO "Grafico" (com G maiúsculo)
const Grafico = () => {
  const doughnutData = {
    labels: ['Item 1', 'Item 2', 'Item 3'],
    datasets: [
      {
        data: [60, 27, 13],
        backgroundColor: ['#9CEE7B', '#B5FF6B', '#D0FF93'],
        hoverOffset: 10,
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    plugins: {
      legend: { position: 'right', labels: { color: '#333', font: { size: 12 } } },
      tooltip: { enabled: true },
    },
  };

  const lineData = {
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    datasets: [
      {
        label: 'Line Data',
        data: [10, 20, 25, 35, 37],
        fill: false,
        borderColor: '#9CEE7B',
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    scales: {
      y: { min: 0, max: 40, ticks: { stepSize: 10, color: '#333' } },
      x: { ticks: { color: '#333' } },
    },
    plugins: { legend: { display: false } },
  };

  const barData = {
    labels: ['Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'],
    datasets: [
      {
        label: 'Sales',
        data: [15, 30, 25, 35, 30, 40, 38, 26, 18],
        backgroundColor: 'rgba(156, 190, 69, 0.8)',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: { beginAtZero: true, ticks: { color: '#333', stepSize: 10 } },
      x: { ticks: { color: '#333' } },
    },
    plugins: { legend: { display: false } },
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <button className="nav-button">Adicionar</button>
      </div>

      <div className="main-container">
        <div className="top-bar">
          <button className="icon-button">
            <FaPlus size={20} color="#333" />
          </button>
          <button className="icon-button">
            <FaBell size={20} color="#333" />
          </button>
          <div className="search-box">
            <FaSearch className="search-icon" size={16} color="#666" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        <div className="main-content">
          <div className="chart-row">
            <div className="chart-box">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="chart-box">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>
          <div className="chart-box full-width">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

// EXPORTA O COMPONENTE "Grafico"
export default Grafico;