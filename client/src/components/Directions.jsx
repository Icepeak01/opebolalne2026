// client/src/components/Directions.jsx
import { DIRECTIONS, VENUE_NOTE, RSVP } from '../config';

export default function Directions() {
  return (
    <div className="directions" id="directions">
      <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>
        Getting There
      </p>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '20px' }}>
        How to <em>Reach Us</em>
      </h2>

      <p className="venue-note">{VENUE_NOTE}</p>

      <div className="directions-grid">
        {DIRECTIONS.map((route) => (
          <div className="direction-card" key={route.axis}>
            <p className="direction-axis">
              <span aria-hidden="true">{route.icon}</span>
              {route.axis}
            </p>
            <ol className="direction-steps">
              {route.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <div className="rsvp-box">
        <h3>Kindly RSVP</h3>
        <p>
          Please let {RSVP.name} (aka {RSVP.alias}) know you're coming —{' '}
          {RSVP.phoneDisplay}
        </p>
        <div className="rsvp-actions">
          <a className="rsvp-btn call" href={`tel:+${RSVP.phoneIntl}`}>
            📞 Call {RSVP.alias}
          </a>
          <a
            className="rsvp-btn whatsapp"
            href={`https://wa.me/${RSVP.phoneIntl}`}
            target="_blank"
            rel="noreferrer"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}