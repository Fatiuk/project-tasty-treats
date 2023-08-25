import Notiflix from 'notiflix';
//* API Handler for Tasty Treats API.
import TastyTreatsAPI from './tasty-treats-api.js';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const tastyTreatsApi = new TastyTreatsAPI();
export async function fetchDataByPath(
  apiPath,
  page,
  limit,
  category,
  time,
  area,
  ingredient,
  title
) {
  tastyTreatsApi.page = page;
  tastyTreatsApi.limit = limit;
  tastyTreatsApi.category = category;
  tastyTreatsApi.time = time;
  tastyTreatsApi.area = area;
  tastyTreatsApi.ingredient = ingredient;
  tastyTreatsApi.title = title;
  try {
    const { data } = await tastyTreatsApi.fetchTreats(apiPath);
    return data;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    return [];
  }
}
