// client/src/components/CountdownSection.jsx
import { EVENTS, BIRTHDAY } from '../config';
import { useCountdown } from '../hooks/useCountdown';

const UNITS = [
  ['days', 'Days'],
  ['hours', 'Hrs'],
  ['minutes', 'Min'],
  ['seconds', 'Sec'],
];

function CountdownCard({ variant, icon, title, dateLabel, targetTime }) {
  const time = useCountdown(targetTime);
  return (
    <div className={`countdown-card ${variant}`}>
      <div className="countdown-card-icon">{icon}</div>
      <h3>{title}</h3>
      <p className="event-date-small">{dateLabel}</p>
      {time ? (
        <div className="time-units">
          {UNITS.map(([k, l]) => (
            <div className="time-unit" key={k}>
              <span className="time-num">{String(time[k]).padStart(2, '0')}</span>
              <span className="time-label">{l}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="celebration-message">The Celebration Has Begun! 🎉</p>
      )}
    </div>
  );
}

export default function CountdownSection() {
  const showBirthday = BIRTHDAY.showCountdownCard && BIRTHDAY.date;

  return (
    <section className="countdown-section" id="events">
      <p className="section-label">Mark Your Calendar</p>
      <h2 className="section-title">
        Counting Down to the <em>Celebration</em>
      </h2>
      <div className="countdown-grid">
        {EVENTS.map((e) => (
          <CountdownCard
            key={e.key}
            variant={e.variant}
            icon={e.icon}
            title={e.title}
            dateLabel={e.dateLabel}
            targetTime={new Date(e.iso).getTime()}
          />
        ))}
        {showBirthday && (
          <CountdownCard
            variant="birthday"
            icon="🎂"
            title="Her Birthday"
            dateLabel={BIRTHDAY.countdownLabel}
            targetTime={new Date(BIRTHDAY.date).getTime()}
          />
        )}
      </div>
    </section>
  );
}
