import Geolocation, {
  GeoCoordinates,
  GeoWatchOptions,
} from 'react-native-geolocation-service';

type watchGeolocationType = {
  onPositionChange: (position: GeoCoordinates) => Promise<void> | void;
};

const options: GeoWatchOptions = {
  enableHighAccuracy: true,
  interval: 30000,
  distanceFilter: 30,
};

export function watchGeolocation({onPositionChange}: watchGeolocationType) {
  const watchId = Geolocation.watchPosition(
    locationInfo => {
      return locationInfo;
    },
    () => {
      console.error(new Error('Error - Could not get coordinates'));
    },
    options,
  );

  return {
    clearWatchId: () => Geolocation.clearWatch(watchId),
  };
}
