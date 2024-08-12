import React from 'react';
import './HeroesSection.css';
import heroi from './assets/icones/heroi/heroi.png';
import toggle from './assets/toggle/toggle.svg';

const HeroesSection = ({ totalHeroes, sortHeroes, isSorted, toggleShowFavorites, showFavoritesOnly }) => {
  return (
    <section id="heroes">
      <div className="container">
        <div className="bar">
          <div className="total-heroes">
            <h4>Encontrados {totalHeroes} heróis</h4>
          </div>
          <div className="order-favorites">
            <h5 onClick={sortHeroes}>
              <img src={heroi} alt="Heroi" /> Ordenar por nome - {isSorted ? "Z/A" : "A/Z"}
            </h5>
            <button 
              className={`toggle-button ${isSorted ? 'active' : ''}`} 
              onClick={sortHeroes}
            >
              <span className="toggle-slider"></span>
            </button>
            <div className="favorites" onClick={toggleShowFavorites}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="red"
                width="24"
                height="24"
                className="favorite-icon"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.98 0 5.42 2.42 5.42 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Somente Favoritos {showFavoritesOnly ? '🦹🏻' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroesSection;
