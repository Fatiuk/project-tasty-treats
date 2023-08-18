//* Функція запитів та те як нею користуватися

//! Обов'язковий імпорт у ваш файла js
import { fetchDataByPath } from './request-handler.js';

//TODO fetchDataByPath((Шлях запиту), page, limit, category, time, area, ingredients);

//! Обов'язковим до заповнення є лише (шлях запиту),
//! який передається у форматі 'string'.
//! Всі інші параметри додаються додатково, далі буде приклад.
// Шляхи запитів ви можете знайти на документації беку
// (https://tasty-treats-backend.p.goit.global/api-docs/)

//TODO Приклад звичайного запиту на бек, БЕЗ ПАРАМЕТРІВ!
// fetchDataByPath('/areas');

//TODO Приклад запиту на бек, З ПАРАМЕТРАМИ
const queryPage = 2;
const queryLimit = 3;
const queryCategory = 'Beef';
const queryTime = 160;
const queryArea = 'Irish';

// fetchDataByPath('/recipes', queryPage); // Випадок коли параметр знаходитья другим
// fetchDataByPath('/recipes', queryPage, queryLimit); // Третій параметр

//! ________________________________________________________________________________
// Особливий випадок, коли параметр останній є вирішення двома способами:
// 1. Створити порожні змінні і задати їм значення null
const nCategory = null;
const nTime = null;

// fetchDataByPath('/recipes', queryPage, queryLimit, nCategory, nTime, queryArea);

// 2. Задати null у виклику функції
// fetchDataByPath('/recipes', queryPage, queryLimit, null, null, queryArea);
//! ________________________________________________________________________________
