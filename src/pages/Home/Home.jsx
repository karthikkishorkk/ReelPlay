import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <HeroBanner />
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on ReelPlay"} category={"popular"} />
        <TitleCards title={"Upcoming Releases"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
