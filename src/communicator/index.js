const axios = require('axios');

class Communicator {
  constructor() {
    this.clockServiceClient = axios.create({ baseURL: 'http://localhost:3001/api' });
    this.weatherServiceClient = axios.create({ baseURL: 'http://localhost:3002/api' });
    //this.orderServiceClient = axios.create({ baseURL: 'http://localhost:3003/api' });
  }
  async getClock() {
    const response = await this.clockServiceClient.get('/clock');
    return response.data;
  }
  async getWeather() {
    const response = await this.weatherServiceClient.get('/weather');
    return response.data;
  }
}

module.exports = new Communicator();