import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GeolocationState} from '../interfaces/Reducer.types';
import MapMarker from '../interfaces/MapMarker.interface';
import MapRegion from '../interfaces/MapRegion.interface';
import DefaultRegion from '../utils/DefaultMapRegion';
import CONSTANTS from '../utils/CONSTANTS';
import Trip from '../interfaces/Trip.interface';

const initialState: GeolocationState = {
  position: null,
  selectedPosition: null,
  markers: [] as MapMarker[],
  currentFolder: 'All',
  folders: ['All'], // need to be updated on startup with the async storage.
  newTripSelectedPosition: null,
  trips: [] as Trip[],
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
    createNewFolder: (state, action: PayloadAction<string>) => {
      state.folders.push(action.payload);
    },
    setCurrentFolder: (state, action: PayloadAction<string>) => {
      state.currentFolder = action.payload;
      if (action.payload !== 'All') {
        const homePos: MapMarker = state.markers.find(
          (marker: MapMarker) =>
            marker.folder === action.payload && marker.type === CONSTANTS.HOME,
        );
        state.position = {
          ...DefaultRegion,
          latitude: homePos.coordinate.latitude,
          longitude: homePos.coordinate.longitude,
        };
      }
    },
    addTrip: (state, action: PayloadAction<Trip>) => {
      // console.log(action.payload.title);
      state.folders.push(action.payload.title);
      state.trips.push(action.payload);
    },
    newTripSelectedPosition: (state, action: PayloadAction<MapMarker>) => {
      state.newTripSelectedPosition = action.payload;
    },
    resetNewTripSelectedPosition: state => {
      state.newTripSelectedPosition = null;
    },
  },
});

export const {
  addMarker,
  deleteMarker,
  setCurrentPosition,
  setSelectedPosition,
  createNewFolder,
  setCurrentFolder,
  addTrip,
  newTripSelectedPosition,
  resetNewTripSelectedPosition,
} = geolocationSlice.actions;

export default geolocationSlice.reducer;
