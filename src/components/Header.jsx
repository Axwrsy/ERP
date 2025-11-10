import Logo from '../assets/LogoCerto.png'
import Estoque from './Estoque';
import { useNavigate } from 'react-router-dom';
//qnd importa a logo aq em cima so precisa chamar em baixo 

function Header(){
    const navigate = useNavigate(); // hook do react-router para navegar

    //retorna um objeto com jsx
    return(
        <div className="sideBar">
        <img src={Logo} alt="Logo" className="logo" />   
         {/*a navegação ao clicar no btn*/}
        <button className="nav-button" onClick={() => navigate('/estoque')}>
        Estoque
       </button>
        {/* grafico */}
    
        {/* Botão que leva ao gráfico */}
        <button className="nav-button" onClick={() => navigate('/entrada-nf')}>
        Entrada NF
        </button>
        <button className="nav-button" onClick={() => navigate('/cadastro-nf')}>
         Cadastro NF
      </button>
    </div>
   
    )
}


export default Header;
