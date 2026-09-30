// client/src/components/Hero.jsx
import { Fragment } from 'react';
import { COUPLE, HERO_DATES, BIRTHDAY } from '../config';

export default function Hero() {
  return (
    <header className="hero">
      <p className="hero-ornament">✦ A Joyful Union ✦</p>
      <h1>
        {COUPLE.bride}
        <span className="hero-ampersand"> & </span>
        {COUPLE.groom}
      </h1>
      <p className="subtitle">Are Getting Married</p>

      {BIRTHDAY.showRibbon && (
        <p className="hero-birthday-ribbon">{BIRTHDAY.ribbonText}</p>
      )}

      <div className="hero-date-badge">
        {HERO_DATES.map((d, i) => (
          <Fragment key={d.label}>
            {i > 0 && <div className="hero-date-divider" />}
            <div className="hero-date-item">
              <span className="hero-date-label">{d.label}</span>
              <span className="hero-date-value">{d.value}</span>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </header>
  );
}
