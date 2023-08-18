import axios from 'axios';

export default class TastyTreatsAPI {
  #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  // Initial values for request parameters
  page = 1;
  limit = 6;
  category = null;
  time = null;
  area = null;
  ingredients = null;

  // Create new treats data using the Tasty Treats API.
  async fetchTreats(apiPath) {
    return await axios.get(`${this.#BASE_URL}${apiPath}`, {
      params: {
        page: this.page,
        limit: this.limit,
        category: this.category,
        time: this.time,
        area: this.area,
        ingredients: this.ingredients,
      },
    });
  }

  // Create new treats data using the Tasty Treats API.
  async createTreats(apiPath) {
    return await axios.post(`${this.#BASE_URL}${apiPath}`);
  }

  // Update existing treats data using the Tasty Treats API.
  async updateTreats(apiPath) {
    return await axios.patch(`${this.#BASE_URL}${apiPath}`);
  }
}
