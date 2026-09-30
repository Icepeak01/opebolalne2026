// client/src/components/Venue.jsx
import { MAP_EMBED_SRC, VENUE_LOCATION } from '../config';
import Directions from './Directions';

export default function Venue() {
  return (
    <section className="venue-section" id="venue">
      <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>
        Find Us Here
      </p>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '36px' }}>
        The <em>Venue</em> & Directions
      </h2>

      <div className="venue-grid">
        <div className="venue-card">
          <div className="venue-card-icon">🕌</div>
          <h3>Nikkah Ceremony</h3>
          <p className="venue-detail">
            <span className="venue-detail-icon">📅</span>
            Friday, October 2, 2026
          </p>
          <p className="venue-detail">
            <span className="venue-detail-icon">⏰</span>
            2:00 PM (WAT)
          </p>
          <p className="venue-detail">
            <span className="venue-detail-icon">📍</span>
            {VENUE_LOCATION}
          </p>
        </div>
        <div className="venue-card">
          <div className="venue-card-icon">💍🥂</div>
          <h3>Engagement & Reception</h3>
          <p className="venue-detail">
            <span className="venue-detail-icon">📅</span>
            Saturday, October 3, 2026
          </p>
          <p className="venue-detail">
            <span className="venue-detail-icon">⏰</span>
            12:00 PM Engagement · 2:00 PM Reception
          </p>
          <p className="venue-detail">
            <span className="venue-detail-icon">📍</span>
            {VENUE_LOCATION}
          </p>
        </div>
      </div>

      <div className="map-container">
        <iframe
          src={MAP_EMBED_SRC}
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wedding Venue Location Map"
        />
      </div>

      <Directions />
    </section>
  );
}