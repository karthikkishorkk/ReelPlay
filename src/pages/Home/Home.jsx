import React, { useRef } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const ScrollableRow = ({ title, category }) => {
  const rowRef = useRef(null);

  const scroll = (offset) => {
    if (rowRef.current) {
      rowRef.current.scrollLeft += offset;
    }
  };

  return (
    <div className="scrollable-row">
      <h2 className="row-title">{title}</h2>
      <div className="scroll-controls">
        <button className="scroll-btn left" onClick={() => scroll(-300)}>&#8249;</button>
        <div className="card-row" ref={rowRef}>
          <TitleCards category={category} />
        </div>
        <button className="scroll-btn right" onClick={() => scroll(300)}>&#8250;</button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div id="home">
        <HeroBanner />
      </div>
      <div className="more-cards">
        <ScrollableRow title="Blockbuster Movies" category="top_rated" />
        <ScrollableRow title="Only on ReelPlay" category="popular" />
        <ScrollableRow title="Upcoming Releases" category="upcoming" />
        <ScrollableRow title="Top Picks for You" category="now_playing" />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
