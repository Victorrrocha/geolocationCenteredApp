import {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions} from 'react-native';
import MapRegion from '../interfaces/MapRegion.interface';
import {mapStyle} from '../styled/mapStyle';
import MapMarker from '../interfaces/MapMarker.interface';
import DefaultRegion from '../utils/DefaultMapRegion';
import CustomMarker from './CustomMarker';
import Modal from './Modal';
import {ModalProps} from './Modal';
import {Box} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {setSelectedPosition} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';
import {mapStyleDark} from '../styled/mapStyleDark';

export type DimentionsType = {
  width: number | string;
  height: number | string;
};

export type MapProps = {
  dimension?: DimentionsType;
  mapMarkers: MapMarker[];
  region: MapRegion;
  navigation?: any;
};

const {width, height} = Dimensions.get('screen');

const Map = ({dimension, region, mapMarkers, navigation}: MapProps) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: RootState) => state.config.darkMode);
  const currentFolder = useSelector(
    (state: RootState) => state.geolocation.currentFolder,
  );
  const [isModalVisible, setModalVisible] = useState(false);

  const onPress = (e: any) => {
    const touchedPostion = e.nativeEvent;
    const TempMarker: MapMarker = {
      id: JSON.stringify(touchedPostion.position),
      folder: currentFolder,
      coordinate: touchedPostion.coordinate,
    };
    mapMarkers.push(TempMarker);
    setModalVisible(true);
  };

  const onCancel = () => {
    mapMarkers.pop();
    dispatch(setSelectedPosition(undefined));
    setModalVisible(false);
  };

  const onConfirm = () => {
    const selectedMarker = mapMarkers[mapMarkers.length - 1];
    mapMarkers.pop();
    const newMapRegion = {
      ...DefaultRegion,
      latitude: selectedMarker.coordinate.latitude,
      longitude: selectedMarker.coordinate.longitude,
    };

    dispatch(setSelectedPosition(newMapRegion));
    setModalVisible(false);
    navigation.navigate('Add New Marker');
  };

  const MapDimentions: DimentionsType = {
    width: dimension?.width || width,
    height: dimension?.height || height,
  };

  const modalProps: ModalProps = {
    isModalVisible,
    onCancel,
    onConfirm,
  };

  return (
    <Box>
      <Modal {...modalProps} />
      <MapView
        onPress={onPress}
        style={MapDimentions}
        region={region}
        showsUserLocation={true}
        customMapStyle={darkMode ? mapStyleDark : mapStyle}>
        {mapMarkers.length > 0 &&
          mapMarkers
            .filter(mapMarker => {
              if (currentFolder === 'All') {
                return true;
              }
              return mapMarker.folder === currentFolder;
            })
            .map(mapMarker => {
              return (
                <Marker key={mapMarker.id} {...mapMarker}>
                  <CustomMarker type={mapMarker.type} />
                </Marker>
              );
            })}
      </MapView>
    </Box>
  );
};

export default Map;
