// client/src/components/Footer.jsx
import { COUPLE } from '../config';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-name">
        {COUPLE.bride} & {COUPLE.groom}
      </p>
      <p className="footer-date">October 2 – 3, 2026 · Lagos, Nigeria</p>
      <div className="footer-divider" />
      <p className="footer-note">
        With love, joy and gratitude — we can't wait to celebrate with you. 💚💙
      </p>
    </footer>
  );
}
