import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { RootState } from '..';

export interface AppScreenState {
  version: string;
  theme: 'light' | 'dark';
  counterValue: number;
}

const initialState: AppScreenState = {
  version: 'Unknown',
  theme: localStorage.getItem('theme') as AppScreenState['theme'] ?? 'light',
  counterValue: 0,
};

export const appScreenSlice: Slice<AppScreenState> = createSlice({
  name: 'appScreen',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppScreenState['theme']>) => {
      localStorage.setItem('theme', action.payload);
      state.theme = action.payload;
    },
    increaseCount: (state,) => {
      state.counterValue += 1;
    },
  },
});

export const { setTheme, increaseCount } = appScreenSlice.actions;

export default appScreenSlice.reducer;

export const setThemeSelector = (state: RootState) => state.appScreen.theme;

