<!-- README.md -->
# Omobolanle & Opeyemi — Wedding Website

A single repository holding two apps:

```
wedding-site/
├── client/                 # Vite + React front-end
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx         # composes the sections
│       ├── config.js       # ← edit dates, images, map, birthday here
│       ├── api.js          # fetch helpers (uses VITE_API_URL)
│       ├── index.css
│       ├── App.css         # your original styles + birthday styles appended
│       ├── hooks/
│       │   └── useCountdown.js
│       └── components/
│           ├── BackgroundVideo.jsx
│           ├── NavBar.jsx
│           ├── Hero.jsx
│           ├── Slideshow.jsx
│           ├── CountdownSection.jsx
│           ├── Story.jsx
│           ├── Venue.jsx
│           ├── SongRequests.jsx
│           ├── MediaGallery.jsx
│           ├── Footer.jsx
│           └── BirthdaySecret.jsx
├── server/                 # Express API
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── package.json            # optional: run both apps at once
└── README.md
```

**Why two `package.json` files?** The client is an ES-module (Vite/React) app and
the server is a CommonJS Node app. Keeping them separate avoids module-type
conflicts and stops server-only dependencies from leaking into the browser build.

---

## 1. Install

From the repo root:

```bash
npm run install:all
```

(That installs `client`, `server`, and the small root helper. Or install each
folder yourself with `npm install` inside `client/` and `server/`.)

## 2. Configure environment

```bash
cp client/.env.example client/.env      # set VITE_API_URL for production
cp server/.env.example server/.env      # fill in Google credentials
```

The server needs Google Cloud Storage + Google Sheets credentials. Fill in every
value in `server/.env`. **Never commit `.env` files** — they're already
git-ignored.

## 3. Run in development

Two terminals, or one command from the root:

```bash
npm run dev            # runs client + server together (needs root install)
# or, separately:
npm run dev:client     # Vite dev server (usually http://localhost:5173)
npm run dev:server     # API on http://localhost:8080
```

## 4. Build for production

```bash
npm run build          # outputs client/dist
```

Deploy `client/dist` to any static host (Vercel, Netlify, Firebase Hosting,
GitHub Pages). Deploy `server/` to a Node host (Render, Railway, Fly.io, Cloud
Run). Then set `VITE_API_URL` in `client/.env` to the deployed server URL and
rebuild the client.

---

## Editing content

Almost everything lives in **`client/src/config.js`**:

- **Names** — `COUPLE`
- **Hero date badges** — `HERO_DATES`
- **Countdown targets** — `EVENTS`
- **Slideshow photos** — `SLIDESHOW_IMAGES`
- **Background video** — `BACKGROUND_VIDEO_SRC` (must be a direct `.mp4` URL or a
  file in `client/public`; Google Drive *share* links do **not** work)
- **Map** — `MAP_EMBED_SRC` (see below)
- **Birthday** — `BIRTHDAY` (see below)

### The venue map

The map uses a Google Maps embed URL. To point it at your real venue:

1. Open [Google Maps](https://maps.google.com) and search for the venue.
2. Click **Share → Embed a map → Copy HTML**.
3. From that HTML, copy just the `src="..."` URL.
4. Paste it as `MAP_EMBED_SRC` in `client/src/config.js`.

That embed URL already contains the exact location and pin, so you don't need raw
coordinates. (If all you have is latitude/longitude, that works too — just say so
and it can be turned into an embed URL.)

### The birthday touches

The wedding date is also the bride's birthday. Controlled entirely by the
`BIRTHDAY` object in `config.js`:

- `showRibbon` — a small hero tagline ("A day twice worth celebrating"). **On by
  default**; needs no personal details.
- `showCountdownCard` — adds a 🎂 card to the countdown. Set `date` first, then
  flip this to `true`.
- `secret` — a floating button that opens a private note with confetti. **Off by
  default.** Write your message, set `enabled: true`, and it appears.
