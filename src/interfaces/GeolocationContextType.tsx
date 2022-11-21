import MapMarker from './MapMarker.interface';
import MapRegion from './MapRegion.interface';

export type GeolocationContextType = {
  store: {
    position: MapRegion;
    selectedPosition: MapRegion;
    markers: MapMarker[];
  };
  setCurrentPosition: (position: MapRegion) => void;
  setSelectedPosition: (position: MapRegion) => void;
  addNewMarker: (marker: any) => void;
  editMarker: (marker: any) => void;
  deleteMarker: (marker: any) => void;
};
