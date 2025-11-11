// app.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Overview from './components/Overview';
import GraficoVisao from './components/graficoVisao';
import Configuracoes from './components/Configuracoes';
import DashboardLayout from './components/DashboardLayout';
import EntradaNF from './components/EntradaNf';
import CadastroNF from './components/CadastroNF';
import Pagamento from './components/Pagamento';

// NOVA ROTAAAAAAAAAA
import ContasAPagar from './components/ContasAPagar';

import './components/css/Header.css';
import './components/css/Grafico.css';


function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Todas as rotas com Header */}
          <Route element={<DashboardLayout />}>
            <Route path="/home" element={<div>Bem-vindo!</div>} />
            <Route path="/estoque" element={<Overview />} />
            <Route path="/grafico" element={<GraficoVisao />} />
            <Route path="/configuracoes" element={<Configuracoes />} />
            <Route path="/cadastro-nf" element={<CadastroNF />} />
            <Route path="/entrada-nf" element={<EntradaNF />} />
            {/*rota p pagamento */}
            <Route path="/programar-pagamento" element={<Pagamento />} />
            

            {/* pagamento da nf */}
            <Route path="/contas-a-pagar" element={<ContasAPagar />} />

            {/* <Route path="/pagamento-nf" element={<Pagamento/>}></Route> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;