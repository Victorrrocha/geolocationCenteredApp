import {useReducer} from 'react';
import {GeolocationContextType} from '../interfaces/GeolocationContextType';
import MapMarker from '../interfaces/MapMarker.interface';
import {GeolocationState} from '../interfaces/Reducer.types';
import geolocationReducer from './geo-app-reducer';
import {createContext} from 'react';
import MapRegion from '../interfaces/MapRegion.interface';
import DefaultRegion from '../utils/DefaultMapRegion';

const defaultState: GeolocationState = {
  position: undefined,
  selectedPosition: undefined,
  markers: [] as MapMarker[],
};

export const GeolocationContext = createContext<GeolocationContextType | null>(
  null,
);

export const GeolocationProvider = ({children}: any) => {
  const [storeState, dispatchAction] = useReducer(
    geolocationReducer,
    defaultState,
  );

  const setCurrentPosition = (position: MapRegion | undefined) => {
    console.log('Update Current Position');
    dispatchAction({type: 'SET_POSITION', item: position});
  };

  const setSelectedPosition = (position: MapRegion | undefined) => {
    dispatchAction({type: 'SET_SELECTED_POSITION', item: position});
  };

  const addNewMarker = (marker: any) => {
    dispatchAction({type: 'ADD', item: marker});
  };

  const editMarker = (marker: any) => {
    dispatchAction({type: 'EDIT', item: marker});
  };

  const deleteMarker = (id: any) => {
    dispatchAction({type: 'DELETE', item: id});
  };

  const geolocationContext: GeolocationContextType = {
    store: storeState,
    setCurrentPosition,
    setSelectedPosition,
    addNewMarker,
    editMarker,
    deleteMarker,
  };

  return (
    <GeolocationContext.Provider value={geolocationContext}>
      {children}
    </GeolocationContext.Provider>
  );
};
