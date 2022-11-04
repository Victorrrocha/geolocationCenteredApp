import {PermissionsAndroid} from 'react-native';
import {getGeolocation} from './getLocation.service';

export const checkForLocationPermission = async () => {
  const result = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  );
  return result;
};

export const askLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Footprint app Location Permission',
        message: 'Footprint app wants to know your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      getGeolocation();
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};
