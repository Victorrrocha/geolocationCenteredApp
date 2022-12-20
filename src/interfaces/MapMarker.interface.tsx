import {Float} from 'react-native/Libraries/Types/CodegenTypes';

type coordinate = {
  latitude: Float;
  longitude: Float;
};

type MapMarker = {
  id: string;
  coordinate: coordinate;
  folder: string;
  price?: string | number;
  currency?: string;
  title?: string;
  description?: string;
  type?: string;
};

export default MapMarker;
