import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context
import { AppProvider } from './context/AppContext';

// Components
import Header from './components/Header/Header';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <AppProvider>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/login' element={ <Login /> } />
          </Routes>
        </BrowserRouter>
    </AppProvider>
  );
}

export default App;
