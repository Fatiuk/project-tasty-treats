import axios from 'axios';
import { Report } from 'notiflix';

export default class TastyTreatsAPI {
  #BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
  // Initial values for request parameters
  page = 1;
  limit = 6;
  category = null;
  time = null;
  area = null;
  ingredient = null;
  title = null;

  // Create new treats data using the Tasty Treats API.
  async fetchTreats(apiPath) {
    return await axios.get(`${this.#BASE_URL}${apiPath}`, {
      params: {
        page: this.page,
        limit: this.limit,
        category: this.category,
        time: this.time,
        area: this.area,
        ingredient: this.ingredient,
        title: this.title,
      },
    });
  }

  // Create new treats data using the Tasty Treats API.
  async createTreats(apiPath, formData) {
    try {
      const response = await axios.post(
        `${this.#BASE_URL}${apiPath}`,
        formData
      );
      Report.success(
        'Success',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      return response.data;
    } catch (error) {
      Report.failure(error.response.data.message);
      Notify.error(error);
    }
  }

  // Update existing treats data using the Tasty Treats API.
  async updateTreats(apiPath, formData) {
    try {
      const response = await axios.patch(
        `${this.#BASE_URL}${apiPath}`,
        formData
      );
      Report.success(
        'Success',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay'
      );
      return response.data;
    } catch (error) {
      Report.failure(error.response.data.message);
    }
  }
}
