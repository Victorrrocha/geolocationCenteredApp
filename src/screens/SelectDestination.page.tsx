import {Box} from 'native-base';
import {useState} from 'react';
import {Dimensions} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useSelector, useDispatch} from 'react-redux';
import CustomMarker from '../components/CustomMarker';
import {DimentionsType} from '../components/Map';
import MapMarker from '../interfaces/MapMarker.interface';
import {newTripSelectedPosition} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';
import {mapStyle} from '../styled/mapStyle';
import {mapStyleDark} from '../styled/mapStyleDark';
import CONSTANTS from '../utils/CONSTANTS';

const {width, height} = Dimensions.get('screen');

const SelectDestination = () => {
  const [destination, setDestination] = useState(null);
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.config.darkMode);
  const currentFolder = useSelector(
    (state: RootState) => state.geolocation.currentFolder,
  );
  const MapDimentions: DimentionsType = {
    width: width,
    height: height,
  };

  const selectThisPosition = (e: any) => {
    const touchedPostion = e.nativeEvent;
    const newDestination: MapMarker = {
      id: currentFolder,
      title: 'Home',
      folder: currentFolder,
      type: CONSTANTS.HOME,
      coordinate: touchedPostion.coordinate,
    };
    setDestination(newDestination);
    dispatch(newTripSelectedPosition(newDestination));
  };

  return (
    <Box>
      <MapView
        onPress={selectThisPosition}
        style={MapDimentions}
        // region={region}
        showsUserLocation={true}
        customMapStyle={darkMode ? mapStyleDark : mapStyle}>
        {destination && (
          <Marker key={destination.id} {...destination}>
            <CustomMarker type={destination.type} />
          </Marker>
        )}
      </MapView>
    </Box>
  );
};

export default SelectDestination;
