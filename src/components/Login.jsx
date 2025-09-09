import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css'
import Logo from '../assets/LogoCerto.png'



const Login = () => {
  const [userName, setUsername] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // função para envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    // validação do login
    if (userName === 'teste' && senha === 'a123') {
      alert('login bem sucedido, ' + userName);

      // salva no localStorage
      const usuario = {
        nome: userName,
        senha: senha,
      };
      localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));

      // limpa os campos
      setUsername('');
      setSenha('');

      // redireciona
      navigate('/home');
    } else {
      alert('Usuário ou senha incorretos!');
      setUsername('');
      setSenha('');
    }
  };

  return (
    <div className='container'>
      <img src={Logo} alt="Logo" className="logo" />  
      <div className='dados'>
        <div className='campo'>
          <input
            type='text'
            placeholder='nome'
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='campo'>
          <input
            type='password'
            placeholder='senha'
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
      </div>
      <div className='btn'>
        <button onClick={handleSubmit}>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
