// import axios from 'axios';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
const areasSelectForm = document.querySelector('.area');
const ingredientsSelectForm = document.querySelector('.ingredients');
const timeSelectForm = document.querySelector('.time-select');

import { fetchDataByPath } from './request-handler';
// Reusable function to create markup for select options
function createMarkupSelect(data) {
  return data
    .map(({ _id, name }) => `<option value="${_id}">${name}</option>`)
    .join('');
}

// Reusable function to fetch data from an API endpoint
// async function fetchData(endpoint) {
//   try {
//     const response = await axios.get(`${BASE_URL}/${endpoint}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}:`, error);
//     return [];
//   }
// }

// Reusable function for loading data and creating markup
async function loadDataAndInsertOptions(apiPath, selectForm) {
  try {
    const data = await fetchDataByPath(apiPath);
    selectForm.insertAdjacentHTML('beforeend', createMarkupSelect(data));
    new SlimSelect({
      select: selectForm,
      settings: {
        showSearch: false,
        selected: [],
      },
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
function initializeSelectTime() {
  for (let i = 5; i <= 160; i += 5) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i + ' min';
    timeSelectForm.appendChild(option);
  }

  new SlimSelect({
    select: timeSelectForm,
    settings: {
      showSearch: false,
    },
  });
}

// Load areas and ingredients data
document.addEventListener('DOMContentLoaded', () => {
  loadDataAndInsertOptions('/ingredients', ingredientsSelectForm);
  loadDataAndInsertOptions('/areas', areasSelectForm);
  initializeSelectTime();
});


