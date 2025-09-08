import Logo from '../assets/LogoProjeto.png'
//qnd importa a logo aq em cima so precisa chamar em baixo 

function Header(){
   
    //retorna um objeto com jsx
    return(
        <div className="sideBar">
        <img src={Logo} alt="Logo" className="logo" />    
        <button className="nav-button">Estoque</button>
        <button className="nav-button">Vendas</button>
        <button className="nav-button">Adicionar</button>
    </div>
    )
}


export default Header;
