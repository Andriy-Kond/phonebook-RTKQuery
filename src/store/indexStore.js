// ^ Без використання localStorage:
import { configureStore } from '@reduxjs/toolkit';
import sliceFilterReducer from './sliceFilter';
import { contactsRTKQuery } from './contactsRTKQueryApi';

// ~ Для RTKQuery в Store передаємо ще один middleware, а редюсер передаємо трохи по-іншому

export default configureStore({
  reducer: {
    // Задаємо будь-яке ім'я, бо був export default:
    storeFilter: sliceFilterReducer,

    // Додавання редюсера через RTK Query трохи по-іншому:
    [contactsRTKQuery.reducerPath]: contactsRTKQuery.reducer,
  },

  // Для RTK Query потрібен додатковий middleware:
  // middleware взагалі є масивом. Тому треба робити concat для того, щоб додати додатковий middleware з RTKQueryApi до цього основного масиву
  // getDefaultMiddleware - спеціальний метод
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsRTKQuery.middleware),
  // розпушувати масив не рекомендується, бо деякі компоненти з попередніх трьох middleware, які під капотом можуть втратитись. Тому Redux просить не робити ось так:
  // middleware: getDefaultMiddleware => [...getDefaultMiddleware(), RTKQueryApi.middleware]
});
