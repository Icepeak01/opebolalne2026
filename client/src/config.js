// client/src/config.js
//
// Everything you're likely to tweak lives here, so you rarely have to touch the
// components themselves.

/* ── API ──────────────────────────────────────────────────────────────────
   In development this falls back to localhost. For production, create a file
   client/.env with:   VITE_API_URL=https://your-deployed-server.com
   (see client/.env.example)                                                   */
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/* ── The couple ───────────────────────────────────────────────────────── */
export const COUPLE = {
  bride: 'Omobolanle',
  groom: 'Opeyemi',
  monogram: 'O & O',
};

/* ── Hero date badges (display text only) ─────────────────────────────── */
export const HERO_DATES = [
  { label: 'Nikkah', value: 'Oct 2, 2026' },
  { label: 'Engagement', value: 'Oct 3, 2026' },
  { label: 'Reception', value: 'Oct 3, 2026' },
];

/* ── Countdown events ─────────────────────────────────────────────────────
   `iso` is the real target time in UTC. Lagos is WAT (UTC+1), so 2:00 PM WAT
   is 13:00 UTC, etc.                                                          */
export const EVENTS = [
  {
    key: 'nikkah',
    variant: 'nikkah',
    icon: '🕌',
    title: 'The Nikkah Ceremony',
    dateLabel: 'Friday, October 2 · 2:00 PM',
    iso: '2026-10-02T13:00:00Z',
  },
  {
    key: 'engagement',
    variant: 'engagement',
    icon: '💍',
    title: 'The Engagement',
    dateLabel: 'Saturday, October 3 · 12:00 PM',
    iso: '2026-10-03T11:00:00Z',
  },
  {
    key: 'reception',
    variant: 'reception',
    icon: '🥂',
    title: 'The Reception',
    dateLabel: 'Saturday, October 3 · 2:00 PM',
    iso: '2026-10-03T13:00:00Z',
  },
];

/* ── Venue ────────────────────────────────────────────────────────────────
   Shown on the venue cards. Update once you have the hall's name.             */
export const VENUE_LOCATION =
  'Better Life Bus Stop, Abaranje (off Ikotun), Lagos';

/* A single friendly line describing the final landmark for all routes. */
export const VENUE_NOTE =
  'Most routes meet at Ikotun, then a short bike (okada) or tricycle (keke) ' +
  'ride to Abaranje. Driving yourself? Head straight to Better Life Bus Stop, ' +
  'Abaranje (off Ikotun) — the hall is right by the road.';

/* ── Venue map ────────────────────────────────────────────────────────────
   This uses a Google Maps *search* embed pointed at the bus stop, so it works
   without coordinates or an API key. Once you know the exact hall, replace it
   with the "src" from Google Maps → your venue → Share → Embed a map.         */
export const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=Abaranje%20Better%20Life%20Bus%20Stop%20Ikotun%20Lagos&z=15&output=embed';

/* ── Directions (text) ────────────────────────────────────────────────────
   Each route is a title plus an ordered list of steps. Edit freely.          */
export const DIRECTIONS = [
  {
    axis: 'From Iyana-Ipaja',
    icon: '🚌',
    steps: [
      'Board a bus from Iyana-Ipaja to Ikotun.',
      'At Ikotun, take a bike (okada) or tricycle (keke) to Abaranje.',
      'Drop at Better Life Bus Stop — the hall is right by the road.',
    ],
  },
  {
    axis: 'From Oshodi',
    icon: '🚌',
    steps: [
      'Board a bus from Oshodi to Ikotun.',
      'At Ikotun, take a bike (okada) or tricycle (keke) to Abaranje.',
      'Drop at Better Life Bus Stop — the hall is right by the road.',
    ],
  },
  {
    axis: 'From anywhere in Lagos',
    icon: '📍',
    steps: [
      'Make your way to Ikotun by any route.',
      'At Ikotun, take a bike (okada) or tricycle (keke) to Abaranje.',
      'Drop at Better Life Bus Stop — the hall is right by the road.',
    ],
  },
  {
    axis: 'Coming with your own car',
    icon: '🚗',
    steps: [
      'Head towards Ikotun, then onto Abaranje Road.',
      'Continue to Better Life Bus Stop, Abaranje.',
      'The hall is right by the road — tap “Open in Google Maps” below to navigate.',
    ],
  },
];

/* Deep link for drivers: opens turn-by-turn directions to the venue. */
export const MAPS_DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Better Life Bus Stop, Abaranje Rd, Alimosho, Lagos');

/* ── RSVP ─────────────────────────────────────────────────────────────────
   Nigerian number: local 0810… becomes +234810… for call/WhatsApp links.     */
export const RSVP = {
  name: 'Oluwadamilola',
  alias: 'Tiana',
  phoneDisplay: '0810 432 2739',
  phoneIntl: '2348104322739', // no "+" or spaces — used for tel: and wa.me
};

/* ── Background video ─────────────────────────────────────────────────────
   Must be a DIRECT video URL (ends in .mp4) or a file placed in
   client/public (then use e.g. '/hero.mp4'). Google Drive *share* links do
   NOT work as a <video> source. Leave '' to show no video (the CSS background
   is used instead).
   NOTE: .MOV (QuickTime/HEVC from iPhones) usually will NOT play in browsers.
   Convert it to .mp4 (H.264) for reliable playback.                          */
export const BACKGROUND_VIDEO_SRC =
  '';
// 'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3249.MOV'
/* ── Slideshow images ─────────────────────────────────────────────────── */
export const SLIDESHOW_IMAGES = [
  'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3515.JPG',
  'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3513%20(1).JPG',
  'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3499.JPG',
  'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3487.JPG',
];

/* ── Birthday touches ─────────────────────────────────────────────────────
   The wedding date is also the bride's birthday. These settings control how
   much of that shows on the site.

   ribbon:          a small, guests-friendly tagline in the hero. ON by default
                    because it needs no personal details.
   showCountdownCard: adds a 🎂 card to the countdown row. Needs `date` set.
   secret:          a floating button only she'd think to tap, opening a private
                    note with confetti. OFF until you write the message and set
                    enabled: true — nothing personal ships by accident.        */
export const BIRTHDAY = {
  showRibbon: true,
  ribbonText: 'A day twice worth celebrating ✨',

  // Set to whichever day is her birthday, e.g. '2026-10-02T13:00:00Z'
  date: '2026-10-03T00:00:00Z',
  showCountdownCard: true,
  countdownLabel: 'The same beautiful day 🎂',

  secret: {
    enabled: false,
    buttonHint: '🎂',
    title: 'Happy Birthday, my love',
    message:
      'TODO: Replace this with your private message to her.\n\n' +
      'Everyone else sees a wedding site — this note is only for you.',
  },
};