// server/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { google } = require('googleapis');

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies for the song requests

// ==========================================
// 1. SETUP GOOGLE CREDENTIALS & CLIENTS
// ==========================================
// Format the private key correctly to handle newline characters from the .env file
const credentials = {
  client_email: process.env.GCS_CLIENT_EMAIL,
  private_key: process.env.GCS_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GCS_PROJECT_ID,
  credentials,
});
const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

// Folder (prefix) inside the bucket where guest uploads are stored.
// Keeps guest media separate from your own "pre-wedding shots/" folder.
const UPLOAD_PREFIX = (
  process.env.GCS_UPLOAD_FOLDER ||
  process.env.GCS_UPLOAD_PREFIX ||
  'guest-uploads'
).replace(/\/+$/, '');

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// Setup Multer to handle files in memory before pushing to GCS
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit per file (adjust as needed)
});

// ==========================================
// 2. SONG REQUEST ROUTES
// ==========================================

// Add a new song request to Google Sheets
app.post('/api/songs', async (req, res) => {
  try {
    const { nickname, song_title, artist_name } = req.body;
    const createdAt = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${process.env.GOOGLE_SHEETS_SONGS_TAB_NAME}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[nickname, song_title, artist_name, createdAt]],
      },
    });

    res.status(201).json({ message: 'Song request added successfully!' });
  } catch (error) {
    console.error('Error adding song:', error);
    res.status(500).json({ error: 'Failed to add song request.' });
  }
});

// Get all song requests from Google Sheets
app.get('/api/songs', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${process.env.GOOGLE_SHEETS_SONGS_TAB_NAME}!A:D`,
    });

    const rows = response.data.values || [];
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching songs:', error);
    res.status(500).json({ error: 'Failed to fetch songs.' });
  }
});

// ==========================================
// 3. MEDIA UPLOAD & HYBRID GALLERY ROUTES
// ==========================================

// Upload Media to GCS and save Metadata to Google Sheets
app.post('/api/media', upload.single('media_file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { media_type, tag_name } = req.body; // e.g., "video", "Nikkah"
    const originalName = req.file.originalname.replace(/\s/g, '_');
    // Store inside the guest-uploads folder, e.g. "guest-uploads/1699..._IMG.jpg"
    const fileName = `${UPLOAD_PREFIX}/${Date.now()}_${originalName}`;
    const fileStream = bucket.file(fileName);

    // Upload stream to Google Cloud Storage
    await fileStream.save(req.file.buffer, {
      resumable: false,
      contentType: req.file.mimetype,
    });

    // NOTE on public access:
    // If the bucket uses Uniform bucket-level access with allUsers granted
    // "Storage Object Viewer" (recommended — see README), the object below is
    // already public and you do NOT need to call makePublic().
    // If instead you use fine-grained ACLs, uncomment the next line:
    // await fileStream.makePublic();

    // The public URL to view/download the file (spaces/slashes URL-encoded)
    const publicUrl = `https://storage.googleapis.com/${process.env.GCS_BUCKET_NAME}/${encodeURIComponent(
      fileName
    ).replace(/%2F/g, '/')}`;
    const createdAt = new Date().toISOString();

    // Save Metadata to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${process.env.GOOGLE_SHEETS_MEDIA_TAB_NAME}!A:D`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[publicUrl, media_type, tag_name, createdAt]],
      },
    });

    res.status(201).json({
      message: 'Media uploaded successfully!',
      url: publicUrl,
    });
  } catch (error) {
    console.error('Error uploading media:', error);
    res.status(500).json({ error: 'Failed to upload media.' });
  }
});

// Fetch Media Gallery Metadata
app.get('/api/media', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: `${process.env.GOOGLE_SHEETS_MEDIA_TAB_NAME}!A:D`,
    });

    const rows = response.data.values || [];
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching media metadata:', error);
    res.status(500).json({ error: 'Failed to fetch media.' });
  }
});

// ==========================================
// 4. START THE SERVER
// ==========================================
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Wedding Backend is running on port ${PORT} 🚀`);
});