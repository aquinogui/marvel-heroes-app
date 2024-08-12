// ListHeroes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importe o Link
import { fetchCharacters } from './services/marvelService';
import HeroesSection from './HeroesSection';
import Header from './Header';
import Spinner from './Spinner'; // ou LoadingLogo

const ListHeroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const getHeroes = async () => {
      const fetchedHeroes = await fetchCharacters();
      const formattedHeroes = fetchedHeroes.map(hero => ({
        id: hero.id,
        name: hero.name,
        imgSrc: `${hero.thumbnail.path}/portrait_uncanny.${hero.thumbnail.extension}`,
      }));
      setHeroes(formattedHeroes);
      setFilteredHeroes(formattedHeroes);
      setLoading(false);
    };

    getHeroes();
  }, []);

  const toggleFavorite = (heroId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(heroId)) {
        return prevFavorites.filter(id => id !== heroId);
      } else if (prevFavorites.length < 5) {
        return [...prevFavorites, heroId];
      }
      return prevFavorites;
    });
  };

  const isFavorite = (heroId) => favorites.includes(heroId);

  const sortHeroes = () => {
    const sortedHeroes = [...filteredHeroes].sort((a, b) =>
      isSorted ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
    );
    setFilteredHeroes(sortedHeroes);
    setIsSorted(!isSorted);
  };

  const handleSearch = (searchTerm) => {
    const filtered = heroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHeroes(filtered);
  };

  const toggleShowFavorites = () => {
    setShowFavoritesOnly(prevState => !prevState);
    if (showFavoritesOnly) {
      setFilteredHeroes(heroes);
    } else {
      setFilteredHeroes(heroes.filter(hero => favorites.includes(hero.id)));
    }
  };

  if (loading) {
    return <Spinner />; // ou <LoadingLogo />
  }

  return (
    <div>
      <Header onSearch={handleSearch} />
      <HeroesSection 
        totalHeroes={filteredHeroes.length} 
        sortHeroes={sortHeroes} 
        isSorted={isSorted} 
        toggleShowFavorites={toggleShowFavorites} // Passe a função para HeroesSection
        showFavoritesOnly={showFavoritesOnly} // Passe o estado para HeroesSection
      />
      <section id="list-heroes">
        <div className="container">
          {filteredHeroes.map(hero => (
            <div
              key={hero.id}
              className={`card-heroes ${isFavorite(hero.id) ? 'favorited' : ''}`}
            >
              <img src={hero.imgSrc} alt={hero.name} />
              <div className="button-favorite" onClick={() => toggleFavorite(hero.id)}>
                <Link to={`/hero/${hero.id}`}>
                  <h2>{hero.name}</h2>
                </Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={isFavorite(hero.id) ? 'red' : 'none'} // Preenchimento vermelho se favorito, nenhum se não
                  stroke={isFavorite(hero.id) ? 'none' : 'red'} // Borda vermelha se não for favorito
                  strokeWidth="2"
                  width="24"
                  height="24"
                  className="favorite-icon"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.98 0 5.42 2.42 5.42 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ListHeroes;
