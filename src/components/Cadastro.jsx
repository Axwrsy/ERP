import { useState } from 'react';


const Cadastro = () => {
  const [userName, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastro = () => {
    if (!userName || !age || !email) {
      alert("Preencha todos os campos!");
      return;
    }

    const usuario = {
      nome: userName,
      idade: age,
      email: email,
    };

    localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
    alert("Usuário cadastrado com sucesso!");
  };

  return (
    <div className='container'>
      <h1>Cadastro de usuários</h1>
      <div className='dados'>
        <div className='campo'>
          <input
            type='text'
            placeholder='nome'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='campo'>
          <input
            type='number'
            placeholder='idade'
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className='campo'>
          <input
            type='email'
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className='btn'>
        <button onClick={handleCadastro}>Cadastrar</button>
      </div>
    </div>
  );
};

export default Cadastro;