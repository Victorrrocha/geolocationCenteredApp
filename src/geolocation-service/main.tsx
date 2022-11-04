import {getGeolocation} from './getLocation.service';
import {
  askLocationPermission,
  checkForLocationPermission,
} from './permissions.service';

export const init = async () => {
  return (await checkForLocationPermission())
    ? getGeolocation()
    : askLocationPermission();
};
