const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.get('/api/weather', (req, res) => {
  res.json({ weather: 'very good' });
});

app.listen(PORT, () => {
  console.log(`Weather Service is running on port ${PORT}`);
});
