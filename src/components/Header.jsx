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
        <button className="nav-button">Vendas</button>
        <button className="nav-button">Configurações</button>
    </div>
   
    )
}


export default Header;
