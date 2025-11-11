// src/components/Configuracoes.jsx
import React, { useState } from 'react';
import { FaMoon, FaSun, FaBell, FaGlobe, FaSignOutAlt, FaUser } from 'react-icons/fa';

const Configuracoes = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificacoes, setNotificacoes] = useState(true);
  const [idioma, setIdioma] = useState('pt');

  const handleLogout = () => {
    alert('Sessão encerrada!');
    // Aqui você pode limpar token, redirecionar para login, etc.
    // navigate('/'); // se usar useNavigate
  };

  return (
    <div className="config-container">
      <div className="config-card">
        <h2 className="config-title">
          <FaUser /> Configurações Perfil
        </h2>

        {/* Perfil */}
        <div className="config-section">
          <h3>Perfil</h3>
          <div className="config-item">
            <span>Nome:</span>
            <input type="text" defaultValue="Admin" className="config-input" />
          </div>
          <div className="config-item">
            <span>Email:</span>
            <input type="email" defaultValue="admin@erp.com" className="config-input" />
          </div>
        </div>

        {/* Aparência */}
        <div className="config-section">
          <h3>Aparência</h3>
          <div className="config-toggle">
            <span><FaMoon /> Modo Escuro</span>
            <button
              className={`toggle-btn ${darkMode ? 'active' : ''}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <div className="toggle-circle"></div>
            </button>
          </div>
        </div>

        {/* Notificações */}
        <div className="config-section">
          <h3>Notificações</h3>
          <div className="config-toggle">
            <span><FaBell /> Receber alertas</span>
            <button
              className={`toggle-btn ${notificacoes ? 'active' : ''}`}
              onClick={() => setNotificacoes(!notificacoes)}
            >
              <div className="toggle-circle"></div>
            </button>
          </div>
        </div>

        {/* Idioma */}
        <div className="config-section">
          <h3>Idioma</h3>
          <div className="config-select">
            <FaGlobe />
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="config-dropdown"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>

        {/* Logout */}
        <div className="config-section">
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Encerrar
          </button>
        </div>
      </div>

      <style jsx>{`
        .config-container {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          font-family: 'Segoe UI', sans-serif;
        }

        .config-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .config-title {
          font-size: 24px;
          margin-bottom: 24px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .config-section {
          margin-bottom: 24px;
        }

        .config-section h3 {
          font-size: 16px;
          color: #555;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .config-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .config-item span {
          color: #666;
          min-width: 80px;
        }

        .config-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          flex: 1;
          font-size: 14px;
        }

        .config-toggle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          color: #444;
        }

        .toggle-btn {
          width: 50px;
          height: 26px;
          background: #ccc;
          border-radius: 50px;
          position: relative;
          border: none;
          cursor: pointer;
          transition: 0.3s;
        }

        .toggle-btn.active {
          background: #9CEE7B;
        }

        .toggle-circle {
          width: 22px;
          height: 22px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: 0.3s;
        }

        .toggle-btn.active .toggle-circle {
          transform: translateX(24px);
        }

        .config-select {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .config-dropdown {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background: white;
          font-size: 14px;
        }

        .logout-btn {
          width: 100%;
          padding: 12px;
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: 0.2s;
        }

        .logout-btn:hover {
          background: #cc0000;
        }
      `}</style>
    </div>
  );
};

export default Configuracoes;