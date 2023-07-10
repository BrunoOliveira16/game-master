import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "hooks/useAuthentication";

const Register = () => {
  const [ displayName, setDisplayName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const navigate = useNavigate();
  const [ error, setError ] = useState('');
  const { createUser, error: authError, loading } = useAuthentication();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const user = {
      displayName,
      email,
      password
    }

    if(password !== confirmPassword) {
      setError('As senhas precisam ser iguais');
      return
    }
    const sucess = await createUser(user)
    if(sucess) {
      navigate('/auth/login');
    }
  };

  useEffect(() => {
    if(authError) {
      setError(authError);
    }
  }, [authError])

  return (
    <div>
      <h2 className='text-center text-title'>Faça aqui seu cadastro</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor='name'>Nome</label>
            <input 
              type='text'
              id='name'
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
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
          <label htmlFor='confirmPassword'>Confirme a senha</label>
          <input 
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {!loading &&  <button type='submit'>Entrar</button>}
          {loading &&  <button disabled>Aguarde...</button>}
          
          {error && <p className='error text-center'>{error}</p>}
      </form>
    </div>
  )
};

export default Register;