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
import Auth from './pages/Auth/Auth';
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
              path='/auth' 
              element={!user ? <Auth /> : <Navigate to='/' /> } 
            />
            <Route 
              path='/dashboard' 
              element={user ? <Dashboard /> : <Navigate to='/' /> } 
            />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthContextProvider>
  );
}

export default App;
