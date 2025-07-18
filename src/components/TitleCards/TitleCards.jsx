import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const url = `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjgzNjc2NTk4NWEwZGViNTUzYTdiZTljMmEyNzZmYSIsIm5iZiI6MTczODMyMDk3Ni45Njg5OTk5LCJzdWIiOiI2NzljYWM1MGE5YjRiMTI4ZmI0ZDIzNjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OH8gnj7ewGiTsWNGMJ8GhcPOR_F1PRGGw5cXitaPrAo'
    }
  };

  useEffect(() => {
    fetch(url, options)
      .then(res => res.json())
      .then(json => setApiData(json.results))
      .catch(err => console.error(err));
  }, [category]); // Update data when category changes

  useEffect(() => {
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    const handleWheel = (event) => {
      event.preventDefault();
      cardsContainer.scrollLeft += event.deltaY > 0 ? 100 : -100; // Adjust scrolling speed
    };

    cardsContainer.addEventListener("wheel", handleWheel);
    
    return () => {
      cardsContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      {/* <h2>{title ? title : "Popular on Netflix"}</h2> */}
      <h2 className="row-title">{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
