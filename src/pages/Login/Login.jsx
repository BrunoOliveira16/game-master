import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.scss';
import { useAuthentication } from "hooks/useAuthentication";

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const { login, error: authError, loading } = useAuthentication();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      email,
      password
    }

    const sucess = await login(user)
    if(sucess) {
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className='login'>
      <h2 className='text-center text-title'>Faça o Login para poder utilizar o sistema.</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>Email</label>
        <input 
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor='password'>Senha</label>
        <input 
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!loading &&  <button type='submit'>Entrar</button>}
        {loading &&  <button disabled>Aguarde...</button>}
        {error && <p className='error text-center'>{error}</p>}
      </form>
      <p className='text-center'>Não possui uma conta? <NavLink className='nav-link' id='register' to='/auth/register'>Registre-se agora</NavLink></p>
    </div>
  )
}

export default Login;