import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    navigate('/');
  }

  return (
    <div>
      <h2 className='text-center text-title'>Faça o Login para poder utilizar o sistema.</h2>
      <form onSubmit={handleLogin}>
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
      <p className='text-center'>Não possui uma conta? <NavLink className='nav-link' id='register' to='/auth/register'>Registre-se agora</NavLink></p>
    </div>
  )
}

export default Login;