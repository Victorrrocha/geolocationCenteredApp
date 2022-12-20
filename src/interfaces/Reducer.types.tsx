import MapMarker from './MapMarker.interface';
import MapRegion from './MapRegion.interface';
import Trip from './Trip.interface';

export type GeolocationState = {
  position: MapRegion | undefined;
  selectedPosition: MapRegion | undefined;
  markers: Array<MapMarker> | Array<any>;
  currentFolder: string;
  folders: Array<String>;
  trips: Array<Trip>;
  newTripSelectedPosition: MapMarker | null;
};

export type GeolocationAction = {
  type: string;
  item: any;
};
