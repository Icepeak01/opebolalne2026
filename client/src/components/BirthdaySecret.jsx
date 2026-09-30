// client/src/components/BirthdaySecret.jsx
import { useState } from 'react';
import { BIRTHDAY } from '../config';

/**
 * A floating button only she'd think to tap. Opens a private note with a little
 * confetti. Renders nothing unless BIRTHDAY.secret.enabled is true in config.
 */
export default function BirthdaySecret() {
  const [open, setOpen] = useState(false);

  if (!BIRTHDAY.secret?.enabled) return null;
  const { buttonHint, title, message } = BIRTHDAY.secret;

  return (
    <>
      <button
        className="birthday-fab"
        onClick={() => setOpen(true)}
        aria-label="A little surprise"
      >
        {buttonHint}
      </button>

      {open && (
        <div className="birthday-modal-backdrop" onClick={() => setOpen(false)}>
          <div className="birthday-modal" onClick={(e) => e.stopPropagation()}>
            <div className="birthday-confetti" aria-hidden="true">
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} style={{ '--i': i }} />
              ))}
            </div>
            <h3>{title}</h3>
            <p>{message}</p>
            <button className="btn btn-gold" onClick={() => setOpen(false)}>
              Close 💛
            </button>
          </div>
        </div>
      )}
    </>
  );
}
