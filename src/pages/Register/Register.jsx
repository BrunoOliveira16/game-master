import { useState } from "react"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    
    navigate('/');
  }

  return (
    <div>
      <h2 className='text-center text-title'>Faça aqui seu cadastro</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor='name'>Nome</label>
            <input 
              type='text'
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
        <label htmlFor='email'>Email</label>
          <input 
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Senha</label>
          <input 
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Entrar</button>
      </form>
    </div>
  )
};

export default Register;