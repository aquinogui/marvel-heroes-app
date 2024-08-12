import axios from 'axios';
import md5 from 'crypto-js/md5';

// Substitua com suas próprias chaves da API da Marvel
const PUBLIC_KEY = '9ae95487bd582c32f6c335b8e7330abc';
const PRIVATE_KEY = 'b8a3dfb8cbd9b83d762173ebb6204d8a2c558509';

const BASE_URL = 'https://gateway.marvel.com:443/v1/public';
const TIMESTAMP = new Date().getTime();
const HASH = md5(TIMESTAMP + PRIVATE_KEY + PUBLIC_KEY).toString(); // Função para gerar o hash MD5

export const fetchCharacters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/characters`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TIMESTAMP,
        hash: HASH,
      }
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Erro ao buscar personagens:', error);
    throw error;
  }
};

export const fetchHeroById = async (characterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters/${characterId}`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TIMESTAMP,
        hash: HASH,
      }
    });
    return response.data.data.results[0];
  } catch (error) {
    console.error('Erro ao buscar detalhes do personagem:', error);
    throw error;
  }
};

export const fetchComicsByCharacter = async (characterId) => {
  try {
    const response = await axios.get(`${BASE_URL}/characters/${characterId}/comics`, {
      params: {
        apikey: PUBLIC_KEY,
        ts: TIMESTAMP,
        hash: HASH,
      }
    });
    return response.data.data.results;
  } catch (error) {
    console.error('Erro ao buscar quadrinhos do personagem:', error);
    throw error;
  }
};
