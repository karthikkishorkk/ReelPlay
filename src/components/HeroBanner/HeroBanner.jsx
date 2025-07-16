import React, { useEffect, useState } from 'react';
import './HeroBanner.css';
import player_icon from '../../assets/player_icon.png';
import info_icon from '../../assets/info_icon.png';

const TMDB_API_KEY = '26836765985a0deb553a7be9c2a276fa'; // replace with your actual TMDB API key

const HeroBanner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_API_KEY}`
        );
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setMovie(data.results[randomIndex]);
      } catch (err) {
        console.error("Failed to fetch hero banner data:", err);
      }
    };

    fetchTrending();
  }, []);

  return movie ? (
    <div
      className="hero-banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="hero-content">
        <h1 className="hero-title">{movie.title || movie.name}</h1>
        <p className="hero-overview">{movie.overview}</p>
        <div className="hero-buttons">
          <button className="hero-btn play">
            <img src={player_icon} alt="Play Icon" />
            Play
          </button>
          <button className="hero-btn info">
            <img src={info_icon} alt="Info Icon" />
            More Info
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default HeroBanner;
