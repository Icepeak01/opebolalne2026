// client/src/api.js
import { API_URL } from './config';

export async function getSongs() {
  const res = await fetch(`${API_URL}/api/songs`);
  if (!res.ok) throw new Error('Failed to fetch songs');
  return res.json();
}

export async function addSong(payload) {
  const res = await fetch(`${API_URL}/api/songs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to add song request');
  return res.json();
}

export async function getMedia() {
  const res = await fetch(`${API_URL}/api/media`);
  if (!res.ok) throw new Error('Failed to fetch media');
  return res.json();
}

export async function uploadMedia(formData) {
  const res = await fetch(`${API_URL}/api/media`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Upload error');
  return res.json();
}
