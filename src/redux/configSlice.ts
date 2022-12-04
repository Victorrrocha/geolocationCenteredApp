import {createSlice} from '@reduxjs/toolkit';

export interface ConfigState {
  darkMode: boolean;
}

const initialState: ConfigState = {
  darkMode: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {toggleDarkMode} = configSlice.actions;

export default configSlice.reducer;
