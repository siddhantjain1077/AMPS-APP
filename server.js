// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());

app.get('/api/tf-images', (req, res) => {
  const images = [
    { label: 'Safety Meter Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Safety' },
    { label: 'Dwelling Available Image 1', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Dwelling' },
    { label: 'ELCB Available Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=ELCB' },
    { label: 'MCB Available Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=ELCB' },
    { label: 'Meter Panel Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Panel' },
    { label: 'Wiring Available Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Wiring' },
    { label: 'Another Image', url: 'https://via.placeholder.com/150/000000/FFFFFF?text=Panel' }
  ];
  res.json({ success: true, data: images });
});

app.listen(PORT, () => {
  console.log(`✅ Mock TF Image API running at http://localhost:${PORT}/api/tf-images`);
});
