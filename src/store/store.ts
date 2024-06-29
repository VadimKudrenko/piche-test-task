import { configureStore } from '@reduxjs/toolkit';
import wikiDataReducer  from './reducers/wikiDataReducer'

export const store = configureStore({
  reducer: {
    wikiData: wikiDataReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
