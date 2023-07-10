import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

import { useAuthentication } from 'hooks/useAuthentication';

// Context
import { AppProvider } from './context/AppContext';
import { AuthContextProvider } from './context/AuthContext';

// Components
import Header from './components/Header/Header';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [ user, setUser ] = useState(undefined);
  const { auth } = useAuthentication();
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <AuthContextProvider value={{ user }}>
      <AppProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route
              path='/' 
              element={ <Home /> } 
            />
            <Route 
              path='/auth/login' 
              element={!user ? <Login /> : <Navigate to='/' /> } 
            />
            <Route 
              path='/auth/register' 
              element={!user ? <Register /> : <Navigate to='/' /> } 
            />
            <Route 
              path='/dashboard' 
              element={user ? <Dashboard /> : <Navigate to='/auth/login' /> } 
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthContextProvider>
  );
}

export default App;
