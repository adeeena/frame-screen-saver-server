const express = require('express');
const communicator = require('../communicator');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/dashboard', async (req, res) => {
  try {
    // Concurrently fetch data from both services for better performance
    const [clockData, weatherData] = await Promise.all([
      communicator.getClock(),
      communicator.getWeather(),
    ]);

    // Combine the results into a single object
    const dashboardData = {
      ...clockData,
      ...weatherData,
    };

    res.json(dashboardData);
  } catch (error) {
    console.error('Error in orchestrator:', error.message);
    // Basic error handling to inform the client if a downstream service fails
    if (error.response) {
      res.status(502).json({ message: 'Error from downstream service', service: error.config.baseURL });
    } else if (error.request) {
      res.status(503).json({ message: 'Downstream service unavailable', service: error.config.baseURL });
    } else {
      res.status(500).json({ message: 'Internal Server Error in orchestrator' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Orchestrator Service is running on port ${PORT}`);
});
