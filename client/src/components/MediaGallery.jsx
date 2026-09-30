// client/src/components/MediaGallery.jsx
import { useState, useEffect } from 'react';
import { getMedia, uploadMedia } from '../api';

function getTagClass(tag) {
  const t = tag?.toLowerCase();
  if (t === 'nikkah') return 'nikkah-tag';
  if (t === 'reception') return 'reception-tag';
  if (t === 'engagement') return 'engagement-tag';
  return '';
}

export default function MediaGallery() {
  const [media, setMedia] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [mediaTag, setMediaTag] = useState('Nikkah');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    try {
      setMedia(await getMedia());
    } catch (e) {
      console.error(e);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!mediaFile) return alert('Please pick a file first!');
    setIsUploading(true);

    const formData = new FormData();
    formData.append('media_file', mediaFile);
    formData.append('media_type', mediaType);
    formData.append('tag_name', mediaTag);

    try {
      await uploadMedia(formData);
      setMediaFile(null);
      loadMedia();
      alert('✨ Memory added to the celebration stream!');
    } catch (err) {
      console.error(err);
      alert('Upload error. Please check the console.');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <section className="media-section" id="gallery">
      <p className="section-label" style={{ display: 'block', textAlign: 'center' }}>
        Share the Moments
      </p>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px' }}>
        Capture the <em>Memories</em>
      </h2>

      <div className="media-layout">
        {/* Upload Form */}
        <div className="upload-form-wrap">
          <h3>Upload a Memory</h3>
          <p>Add photos & videos to our shared celebration album.</p>

          <form onSubmit={handleSubmit}>
            <div className="file-drop-zone">
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setMediaFile(e.target.files[0])}
                required
              />
              <span className="file-drop-icon">📸</span>
              <p className="file-drop-text">
                Click or drag & drop
                <br />
                <small>Images or Videos (up to 50MB)</small>
              </p>
              {mediaFile && <span className="file-selected">✔ {mediaFile.name}</span>}
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Media Type</label>
                <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                  <option value="image">📷 Image</option>
                  <option value="video">🎥 Video</option>
                </select>
              </div>
              <div className="form-field">
                <label>Event Tag</label>
                <select value={mediaTag} onChange={(e) => setMediaTag(e.target.value)}>
                  <option value="Nikkah">🕌 Nikkah</option>
                  <option value="Engagement">💍 Engagement</option>
                  <option value="Reception">🥂 Reception</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold"
              disabled={isUploading}
              style={{ marginTop: '8px' }}
            >
              {isUploading ? '⏳ Uploading...' : '✨ Add to Album'}
            </button>
          </form>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="gallery-title">The Celebration Stream</h3>
          <div className="gallery-grid">
            {media.length === 0 ? (
              <div className="gallery-empty">
                <p style={{ fontSize: '2rem' }}>📷</p>
                <p>The album is waiting for your memories!</p>
              </div>
            ) : (
              media.map((item, i) => {
                const [url, type, tag] = item;
                return (
                  <div key={i} className="gallery-card">
                    {type === 'image' ? (
                      <img src={url} alt="Wedding memory" />
                    ) : (
                      <video src={url} controls />
                    )}
                    <div className="gallery-info">
                      <span className={`tag-badge ${getTagClass(tag)}`}>{tag}</span>
                      <a href={url} target="_blank" rel="noreferrer" className="gallery-download">
                        ↓ Save
                      </a>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
