// client/src/CheckIn.jsx
import { useState, useEffect } from 'react';
import { adminLogin, searchGuests, checkinGuest } from './api';
import { COUPLE } from './config';

const KEY_STORAGE = 'oo_admin_key';

export default function CheckIn() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem(KEY_STORAGE)) setAuthed(true);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setAuthError('');
    try {
      await adminLogin(password);
      sessionStorage.setItem(KEY_STORAGE, password);
      setPassword('');
      setAuthed(true);
    } catch {
      setAuthError('Incorrect password. Please try again.');
    }
  }

  function logout() {
    sessionStorage.removeItem(KEY_STORAGE);
    setAuthed(false);
    setResults([]);
    setQuery('');
    setMsg('');
  }

  async function handleSearch(e) {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      const key = sessionStorage.getItem(KEY_STORAGE);
      const data = await searchGuests(query, key);
      setResults(data);
      if (data.length === 0) setMsg('No guest found by that name.');
    } catch (err) {
      if (err.message === 'unauthorized') {
        logout();
        setAuthError('Session expired — please log in again.');
      } else {
        setMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function toggleCheckin(guest) {
    const key = sessionStorage.getItem(KEY_STORAGE);
    const undo = Boolean(guest.checkedInAt);
    try {
      const res = await checkinGuest(guest.row, key, undo);
      setResults((rows) =>
        rows.map((g) =>
          g.row === guest.row ? { ...g, checkedInAt: res.checkedInAt } : g
        )
      );
    } catch {
      setMsg('Could not update check-in. Please try again.');
    }
  }

  if (!authed) {
    return (
      <div className="checkin-page">
        <div className="checkin-login">
          <div className="checkin-logo">{COUPLE.monogram}</div>
          <h1>Guest Check-In</h1>
          <p className="checkin-sub">Admin access only</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-gold">
              Log in
            </button>
          </form>
          {authError && <p className="checkin-error">{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="checkin-page">
      <div className="checkin-topbar">
        <span className="checkin-logo small">{COUPLE.monogram}</span>
        <button className="checkin-logout" onClick={logout}>
          Log out
        </button>
      </div>

      <div className="checkin-body">
        <h1>Guest Check-In</h1>

        <form className="checkin-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search guest name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn btn-gold" disabled={loading}>
            {loading ? 'Searching…' : 'Search'}
          </button>
        </form>

        {msg && <p className="checkin-msg">{msg}</p>}

        <div className="guest-list">
          {results.map((g) => (
            <div key={g.row} className={`guest-card${g.checkedInAt ? ' checked' : ''}`}>
              <div className="guest-info">
                <strong>{g.name}</strong>
                <span>
                  {g.tableName || 'Table'}
                  {g.tableNumber ? ` · No. ${g.tableNumber}` : ''}
                </span>
                {g.checkedInAt && <span className="guest-checked-label">✔ Checked in</span>}
              </div>
              <button
                className={`btn ${g.checkedInAt ? 'btn-mint' : 'btn-gold'}`}
                onClick={() => toggleCheckin(g)}
              >
                {g.checkedInAt ? 'Undo' : 'Check in'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}