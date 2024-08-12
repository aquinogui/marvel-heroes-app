import React, { useState } from 'react';
import logo from './assets/logo/Group.png'; // Ajuste o caminho conforme a estrutura do seu projeto
import searchIcon from './assets/busca/Lupa/lupa.png'; // Adicione o ícone da lupa ao seu projeto

const Header = ({ onSearch }) => { // Desestruture onSearch da props
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) { // Verifica se onSearch é uma função
      onSearch(value); // Passa o valor da busca para o componente pai
    }
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="main-text">
          <h2>Explore o universo</h2>
          <h6>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</h6>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Procurar heróis"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          
        </div>
      </div>
    </header>
  );
}

export default Header;
