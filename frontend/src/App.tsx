import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Menu from './components/Menu';
import ClientDetail from './screens/Clients/components/ClientDetail';
import { Home } from './components/Home';
import { BalanceProvider } from './context/BalanceContext';

function App() {

  return (
    <>
     <BalanceProvider>
        <BrowserRouter>
          <div>
            <Menu />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/client/:id" element={<ClientDetail />} />
            </Routes>
          </div>
        </BrowserRouter>
      </BalanceProvider>
    </>
  )
}

export default App
