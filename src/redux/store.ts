import {configureStore} from '@reduxjs/toolkit';
import geolocationReducer from './geolocationSlice';
import configReducer from './configSlice';

export const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    config: configReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
