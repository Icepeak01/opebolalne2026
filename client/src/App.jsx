// client/src/App.jsx
import './App.css';

import BackgroundVideo from './components/BackgroundVideo';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Slideshow from './components/Slideshow';
import CountdownSection from './components/CountdownSection';
import Story from './components/Story';
import Venue from './components/Venue';
import SongRequests from './components/SongRequests';
import MediaGallery from './components/MediaGallery';
import Footer from './components/Footer';
import BirthdaySecret from './components/BirthdaySecret';

export default function App() {
  return (
    <>
      <BackgroundVideo />
      <NavBar />

      <div className="container">
        <Hero />
        <Slideshow />
        <CountdownSection />
        <hr className="section-divider" />
        <Story />
        <hr className="section-divider" />
        <Venue />
        <hr className="section-divider" />
        <SongRequests />
        <hr className="section-divider" />
        <MediaGallery />
      </div>

      <Footer />
      <BirthdaySecret />
    </>
  );
}
