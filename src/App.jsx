import React, { useState }  from 'react';

// Context
import { AppProvider } from './context/AppContext';

// Components
import MainContent from './components/MainContent/MainContent';
import Header from './components/Header/Header';

function App() {
  return (
    <AppProvider>
      <div>
        <Header/>
        <MainContent/>
      </div>
    </AppProvider>
  );
};

export default App;
