const express = require('express');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/clock', (req, res) => {
  res.json({ time: moment().format() });
});

app.listen(PORT, () => {
  console.log(`Clock Service is running on port ${PORT}`);
});
