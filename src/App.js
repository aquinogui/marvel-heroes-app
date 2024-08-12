
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListHeroes from './ListHeroes';
import HeroDetail from './HeroDetail'; // Importe o componente de detalhes

import './App.css'; // Certifique-se de criar e incluir o CSS aquinpm install react-router-dom@latest

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ListHeroes />} />
      <Route path="/hero/:id" element={<HeroDetail />} /> {/* Rota para detalhes do herói */}
    </Routes>
  </Router>
);

export default App;
