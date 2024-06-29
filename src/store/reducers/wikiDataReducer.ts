import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

import { IFetchData } from '../../models/IFetchData';

const initialState: IFetchData = {
  holidays: [],
  events: [],
  births: [],
}

export const wikiDataSlice = createSlice({
  name: 'wikiData',
  initialState,
  reducers: {
    fetchNewData: (state, action:PayloadAction<IFetchData>) => {
      state.holidays = action.payload.holidays;
      state.events = action.payload.events;
      state.births = action.payload.births;
    },
  },
});

export const { fetchNewData } = wikiDataSlice.actions;

export const wikiData = (state: RootState) => state

export default wikiDataSlice.reducer
