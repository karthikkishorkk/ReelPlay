import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNjgzNjc2NTk4NWEwZGViNTUzYTdiZTljMmEyNzZmYSIsIm5iZiI6MTczODMyMDk3Ni45Njg5OTk5LCJzdWIiOiI2NzljYWM1MGE5YjRiMTI4ZmI0ZDIzNjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.OH8gnj7ewGiTsWNGMJ8GhcPOR_F1PRGGw5cXitaPrAo',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [videoRes, detailsRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
        ]);

        const videoJson = await videoRes.json();
        const detailsJson = await detailsRes.json();

        const trailer = videoJson.results?.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        );

        setApiData({
          trailer: trailer || videoJson.results[0],
          details: detailsJson,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Go Back"
        onClick={() => navigate(-1)}
        className="back-btn"
      />

      {loading ? (
        <p className="loading-text">Loading trailer...</p>
      ) : apiData?.trailer && apiData?.details ? (
        <>
          <iframe
            width="90%"
            height="500"
            src={`https://www.youtube.com/embed/${apiData.trailer.key}`}
            title={apiData.trailer.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>

          <div className="movie-details">
            <h1>{apiData.details.title}</h1>
            {apiData.details.tagline && (
              <p><strong>Tagline:</strong> <em>{apiData.details.tagline}</em></p>
            )}
            <p><strong>Overview:</strong> {apiData.details.overview}</p>
            <p><strong>Release Date:</strong> {apiData.details.release_date}</p>
            <p><strong>Runtime:</strong> {apiData.details.runtime} minutes</p>
            <p><strong>Rating:</strong> {apiData.details.vote_average} ★ ({apiData.details.vote_count} votes)</p>
            <p><strong>Genres:</strong> {apiData.details.genres.map(g => g.name).join(', ')}</p>
          </div>
        </>
      ) : (
        <p className="error-text">No trailer or movie data available.</p>
      )}
    </div>
  );
};

export default Player;
