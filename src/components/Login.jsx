import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import Logo from '../assets/LogoCerto.png';
import LogoDois from '../assets/logoAzul.png'

const Login = () => {
  const [userName, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Função para envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    if (userName === 'teste' && senha === 'a123') {
      alert('Login bem sucedido, ' + userName);

      const usuario = { nome: userName, senha: senha };
      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

      setUsername('');
      setSenha('');

      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos!');
      setUsername('');
      setSenha('');
    }
  };

  return (
    
   
    <div className="signup">
  <img src={LogoDois} alt="LogoDois" className="signin-img" />
  <form onSubmit={handleSubmit} className="form-login">
    <input
      type="text"
      placeholder="Nome de usuário"
      value={userName}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Senha"
      value={senha}
      onChange={(e) => setSenha(e.target.value)}
    />
    <button type="submit" className="signup-btn">Entrar</button>
  </form>
</div>


      

  );
};

export default Login;
