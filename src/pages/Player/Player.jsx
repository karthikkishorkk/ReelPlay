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
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((res) => res.json())
      .then((json) => {
        const trailer = json.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
        setApiData(trailer || json.results[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="player">
      <img src={back_arrow_icon} alt="Go Back" onClick={() => navigate(-1)} className="back-btn" />
      {loading ? (
        <p className="loading-text">Loading trailer...</p>
      ) : apiData ? (
        <>
          <iframe
            width="90%"
            height="90%"
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title={apiData.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="player-info">
            <p><strong>Published:</strong> {apiData.published_at?.slice(0, 10) || 'N/A'}</p>
            <p><strong>Title:</strong> {apiData.name}</p>
            <p><strong>Type:</strong> {apiData.type}</p>
          </div>
        </>
      ) : (
        <p className="error-text">No trailer available for this content.</p>
      )}
    </div>
  );
};

export default Player;
