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
  async createTreats(apiPath, formData) {
    try{
      const response = await axios.post(`${this.#BASE_URL}${apiPath}`, formData);
      Report.success(
        'Notiflix Success',
        '"Do not try to become a person of success but try to become a person of value." <br/><br/>- Albert Einstein',
        'Okay',
        );
      return response.data
      }catch(error){
      console.log(error);
    }
    
  }

  // Update existing treats data using the Tasty Treats API.
  async updateTreats(apiPath) {
    return await axios.patch(`${this.#BASE_URL}${apiPath}`);
  }
}
