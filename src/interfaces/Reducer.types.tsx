import MapMarker from './MapMarker.interface';
import MapRegion from './MapRegion.interface';

export type GeolocationState = {
  position: MapRegion | undefined;
  selectedPosition: MapRegion | undefined;
  markers: Array<MapMarker> | Array<any>;
};

export type GeolocationAction = {
  type: string;
  item: any;
};
