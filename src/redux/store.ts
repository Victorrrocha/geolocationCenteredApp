import {configureStore} from '@reduxjs/toolkit';
import geolocationReducer from './geolocationSlice';
import configReducer from './configSlice';
import conversionSlice from './conversionSlice';

export const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    config: configReducer,
    conversion: conversionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
