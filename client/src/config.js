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
  'All routes meet at Ikotun. From there it is a short bike (okada) or ' +
  'tricycle (keke) ride to Abaranje — the hall is right by the road at ' +
  'Better Life Bus Stop.';

/* ── Venue map ────────────────────────────────────────────────────────────
   This uses a Google Maps *search* embed pointed at the bus stop, so it works
   without coordinates or an API key. Once you know the exact hall, replace it
   with the "src" from Google Maps → your venue → Share → Embed a map.         */
export const MAP_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7927.810636912436!2d3.2341222!3d6.533641!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b850d5b8d40f1%3A0x7a1697fcdad72a64!2sbetter%20life%20bus%20stop%2C%2015%20Hon.%20Balo%20St%2C%20Abaranje%20Rd%2C%20Alimosho%2C%20Lagos%20100001%2C%20Lagos!5e0!3m2!1sen!2sng!4v1790487980817!5m2!1sen!2sng';

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
];

/* ── RSVP ─────────────────────────────────────────────────────────────────
   Nigerian number: local 0810… becomes +234810… for call/WhatsApp links.     */
export const RSVP = {
  name: 'Oluwadamilola',
  alias: 'Tiana',
  phoneDisplay: '0810 432 2739',
  phoneIntl: '2348104322739', // no "+" or spaces — used for tel: and wa.me
};

/* ── Background video ─────────────────────────────────────────────────────
                       */
export const BACKGROUND_VIDEO_SRC =
  'https://storage.googleapis.com/oo-wedding-2026-media/pre-wedding%20shots/IMG_3249.mp4';

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
    enabled: true,
    buttonHint: '🎂',
    title: 'Happy Birthday, my love',
    message:
      'TODO: Replace this with your private message to her.\n\n' +
      'Everyone else sees a wedding site — this note is only for you.',
  },
};