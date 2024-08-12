// src/HeroDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHeroById } from './services/marvelService';
import Spinner from './Spinner'; // 
import logo from './assets/logo/Group.png'; //
import book from './assets/icones/book/Group.png'; 
import video from './assets/icones/video/Shape.png'; 
import rating from './assets/review/Group.png'; 

const HeroDetail = () => {
  const { id } = useParams(); // Obtém o id da URL
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHero = async () => {
      try {
        const fetchedHero = await fetchHeroById(id); // Busca o herói usando o id
        if (fetchedHero) {
          setHero(fetchedHero);
        } else {
          console.error('Herói não encontrado.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar herói:', error);
        setLoading(false);
      }
    };

    getHero();
  }, [id]);

  if (loading) {
    return <Spinner />; 
  }

  if (!hero) {
    return <div>Heroi não encontrado!</div>;
  }

  return (
    <body className='in'>
    <div>
      <header className="header-in">
        <div className="container">
          <div className="logo-left">
            <img src={logo} alt="Logo" />
          </div>
          <div className="form-in">
            <input type="text" placeholder="Procure por heroi" />
          </div>
        </div>
      </header>

      <section id="detail-hero">
        <div className="container">
          <div className="left-detail">
            <h1>{hero.name}</h1>
            <p>{hero.description || 'Descrição não disponível.'}</p>

            <div className="stats">
              <div className="details-hqs">
                <span>Quadrinhos</span>
                <div className="api-details">
                  <img src={book} alt="Quadrinhos" />
                  <h5>{hero.comics?.available || 'Não disponível'}</h5>
                </div>
              </div>
              <div className="details-hqs">
                <span>Filmes</span>
                <div className="api-details">
                  <img src={book} alt="Filmes" />
                  <h5>{hero.series?.available || 'Não disponível'}</h5>
                </div>
              </div>
            </div>
            <div className="rating">
              Rating: <img src={rating} alt="Rating" />
            </div>
            <div>
              Último quadrinho: <strong>{hero.lastComicDate || 'Não disponível'}</strong>
            </div>
          </div>

          <div className="right-detail">
  <img
    src={`${hero.thumbnail.path}/detail.${hero.thumbnail.extension}`} // Tentando um tamanho maior
    onError={(e) => {
      e.target.src = `${hero.thumbnail.path}/landscape_incredible.${hero.thumbnail.extension}`; // Outra opção de tamanho
    }}
    alt={hero.name}
  />
</div>

        </div>
      </section>

      <div className="last-hqs">
        <h4 className="container">Últimos Lancamentos</h4>
        <div className="container">
          {hero.lastComics?.map((comic, index) => (
            <div className="hq-card" key={index}>
              <img src={comic.thumbnail} alt={comic.title} />
              <h4>{comic.title}</h4>
            </div>
          )) || 'Nenhuma HQ disponível'}
        </div>
      </div>
    </div>
    <footer>

</footer>
    </body>
    
  );
};

export default HeroDetail;
