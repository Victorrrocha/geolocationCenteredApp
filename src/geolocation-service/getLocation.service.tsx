import Geolocation from 'react-native-geolocation-service';
import MapRegion from '../interfaces/MapRegion.interface';

export const getGeolocation = (): Promise<MapRegion | undefined> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        if (position?.coords) {
          const region: MapRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          };
          resolve(region);
        }
      },
      () => {
        resolve(undefined);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
