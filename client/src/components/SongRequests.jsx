// client/src/components/SongRequests.jsx
import { useState, useEffect } from 'react';
import { getSongs, addSong } from '../api';

const EMPTY_FORM = { nickname: '', song_title: '', artist_name: '' };

export default function SongRequests() {
  const [songs, setSongs] = useState([]);
  const [songForm, setSongForm] = useState(EMPTY_FORM);

  useEffect(() => {
    loadSongs();
  }, []);

  async function loadSongs() {
    try {
      setSongs(await getSongs());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addSong(songForm);
      setSongForm(EMPTY_FORM);
      loadSongs();
      alert('🎵 Thank you! Your song request has been added.');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <section className="songs-section" id="playlist">
      <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>
        Dance Floor Fuel
      </p>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
        Help Us Build the <em>Playlist</em>
      </h2>

      <div className="songs-layout">
        {/* Form */}
        <div className="song-form-wrap">
          <h3>Request a Track</h3>
          <p>What song guarantees you on the dance floor?</p>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label>Your Nickname</label>
              <input
                type="text"
                placeholder="e.g. AuntyBisi"
                value={songForm.nickname}
                onChange={(e) => setSongForm({ ...songForm, nickname: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label>Song Title</label>
              <input
                type="text"
                placeholder="e.g. Essence"
                value={songForm.song_title}
                onChange={(e) => setSongForm({ ...songForm, song_title: e.target.value })}
                required
              />
            </div>
            <div className="form-field">
              <label>Artist Name</label>
              <input
                type="text"
                placeholder="e.g. Wizkid ft. Tems"
                value={songForm.artist_name}
                onChange={(e) => setSongForm({ ...songForm, artist_name: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn btn-mint">
              🎵 Submit Request
            </button>
          </form>
        </div>

        {/* Song List */}
        <div className="songs-list-wrap">
          <h3>Requested Tracks ({songs.length})</h3>
          <div className="songs-scroll">
            {songs.length === 0 ? (
              <p className="empty-state">No tracks yet — be the first to request one!</p>
            ) : (
              songs.map((song, i) => (
                <div key={i} className="song-item">
                  <div className="song-icon">🎵</div>
                  <div className="song-info">
                    <strong>{song[1]}</strong>
                    <span>{song[2]}</span>
                  </div>
                  <span className="song-nick">{song[0]}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
