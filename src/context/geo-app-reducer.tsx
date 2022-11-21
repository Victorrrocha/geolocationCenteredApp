import MapMarker from '../interfaces/MapMarker.interface';
import {GeolocationState} from '../interfaces/Reducer.types';

function addMarker(state: GeolocationState, marker: MapMarker) {
  // console.log(marker);
  const index = state.markers.findIndex(
    savedMarker => savedMarker.id === marker.id,
  );
  if (index !== -1) {
    console.log('REPLACING');
    state.markers[index] = marker;
    return state;
  }
  //console.log('NEW STATE');
  //console.log({...state, markers: [...state.markers, marker]});
  return {...state, markers: [...state.markers, marker]};
}

function editMarker(state: GeolocationState, marker: MapMarker) {
  const index = state.markers.findIndex(
    stateMaker => stateMaker.id === marker.id,
  );
  state.markers.splice(index, 1, marker);
  return {...state, markers: [...state.markers]};
}

function deleteMarker(state: GeolocationState, key: any) {
  return {
    ...state,
    markers: state.markers.filter((marker: MapMarker) => marker.id !== key),
  };
}

const geolocationReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'ADD':
      return addMarker(state, action.item);
    case 'EDIT':
      return editMarker(state, action.item);
    case 'DELETE':
      return deleteMarker(state, action.item);
    case 'SET_POSITION':
      // console.log('SETTING POSITION');
      // console.log({...state, position: action.item});
      return {...state, position: action.item};
    case 'SET_SELECTED_POSITION':
      return {...state, selectedPosition: action.item};
  }
};

export default geolocationReducer;
