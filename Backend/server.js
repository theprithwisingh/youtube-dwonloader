import express from 'express';
import ytdl from 'ytdl-core';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT =  4003;

// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Endpoint to get video formats
app.get('/download', async (req, res) => {
  const videoURL = req.query.url;
  if (!ytdl.validateURL(videoURL)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    const info = await ytdl.getInfo(videoURL);
    const formats = ytdl.filterFormats(info.formats, 'videoonly');
    res.json(formats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to download the video
app.get('/download/:id', (req, res) => {
  const videoURL = req.query.url;
  const formatID = req.params.id;

  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(videoURL, { format: { quality: formatID } }).pipe(res);
});

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
