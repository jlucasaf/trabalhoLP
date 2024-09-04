import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BemVindo from './components/BemVindo';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import Doacao from './components/Doacao';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BemVindo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/doacao" element={<Doacao />} />
      </Routes>
    </Router>
  );
}

export default App;
