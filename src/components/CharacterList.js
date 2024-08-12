// src/components/CharacterList.js
import React, { useEffect, useState } from 'react';
import { fetchCharacters } from '../services/marvelService';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async () => {
      const fetchedCharacters = await fetchCharacters();
      console.log('Characters:', fetchedCharacters); // Log para depuração
      setCharacters(fetchedCharacters);
      setLoading(false);
    };

    getCharacters();
  }, []);

  if (loading) {
    return <p>Loading characters...</p>;
  }

  return (
    <div>
      <h2>Marvel Characters</h2>
      {characters.length > 0 ? (
        <ul>
          {characters.map((character) => (
            <li key={character.id}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{ width: '100px', height: 'auto' }} // Ajuste o tamanho conforme necessário
              />
              <p>{character.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No characters found.</p>
      )}
    </div>
  );
};

export default CharacterList;
