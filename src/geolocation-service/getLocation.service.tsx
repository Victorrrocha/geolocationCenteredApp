import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

export const getGeolocation = (): Promise<GeoCoordinates | undefined> => {
  return new Promise(resolve => {
    Geolocation.getCurrentPosition(
      position => {
        position?.coords && resolve(position.coords);
      },
      () => {
        resolve(undefined);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};
