import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GeolocationState} from '../interfaces/Reducer.types';
import MapMarker from '../interfaces/MapMarker.interface';
import MapRegion from '../interfaces/MapRegion.interface';

const initialState: GeolocationState = {
  position: null,
  selectedPosition: null,
  markers: [] as MapMarker[],
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<MapMarker>) => {
      state.markers.push(action.payload);
    },
    deleteMarker: (state, action: PayloadAction<any>) => {
      state.markers = state.markers.filter(
        marker => marker.id !== action.payload,
      );
    },
    setCurrentPosition: (state, action: PayloadAction<MapRegion>) => {
      state.position = action.payload;
    },
    setSelectedPosition: (state, action: PayloadAction<MapRegion>) => {
      state.selectedPosition = action.payload;
    },
  },
});

export const {
  addMarker,
  deleteMarker,
  setCurrentPosition,
  setSelectedPosition,
} = geolocationSlice.actions;

export default geolocationSlice.reducer;
