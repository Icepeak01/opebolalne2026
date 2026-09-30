// client/src/components/NavBar.jsx
import { COUPLE } from '../config';

const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'Events', href: '#events' },
  { label: 'Venue', href: '#venue' },
  { label: 'Playlist', href: '#playlist' },
  { label: 'Gallery', href: '#gallery' },
];

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <span className="nav-logo">{COUPLE.monogram}</span>
      {navLinks.map((l) => (
        <a key={l.label} href={l.href} className="nav-link">
          {l.label}
        </a>
      ))}
    </nav>
  );
}
