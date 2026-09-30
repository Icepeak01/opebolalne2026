// client/src/components/Slideshow.jsx
import { useState, useEffect } from 'react';
import { SLIDESHOW_IMAGES } from '../config';

export default function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrentSlide((p) => (p + 1) % SLIDESHOW_IMAGES.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const current = SLIDESHOW_IMAGES[currentSlide];

  return (
    <div className="slideshow-wrapper">
      <div className="slideshow-inner">
        {/* Blurred fill so portrait & landscape photos both show in full */}
        <div
          className="slide-bg"
          style={{ backgroundImage: `url("${current}")` }}
          aria-hidden="true"
        />
        <img src={current} alt="Wedding gallery" className="slide-img" />
        <div className="slideshow-overlay" />
        <div className="slideshow-dots">
          {SLIDESHOW_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`dot${i === currentSlide ? ' active' : ''}`}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              style={{ border: 'none', padding: 0, cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}