import {useState, useContext, useRef, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {Dimensions, View} from 'react-native';
import MapRegion from '../interfaces/MapRegion.interface';
import {mapStyle} from '../styled/mapStyle';
import MapMarker from '../interfaces/MapMarker.interface';
import {GeolocationContext} from '../context/GeolocationContext';
import DefaultRegion from '../utils/DefaultMapRegion';
import CustomMarker from './CustomMarker';
import Modal from './Modal';
import {ModalProps} from './Modal';

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
  const context = useContext(GeolocationContext);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [mapMarkers, setMarkers] = useState(context.store.markers);

  // useEffect(() => {
  //   if (JSON.stringify(mapMarkers) !== JSON.stringify(context.store.markers)) {
  //     setMarkers(context.store.markers);
  //   }
  // }, [context]);

  const onPress = (e: any) => {
    const touchedPostion = e.nativeEvent;
    const TempMarker: MapMarker = {
      id: JSON.stringify(touchedPostion.position),
      coordinate: touchedPostion.coordinate,
    };
    mapMarkers.push(TempMarker);
    // setMarkers(prev => {
    //   console.log([...prev, TempMarker]);
    //   return [...prev, TempMarker];
    // });
    setModalVisible(true);
  };

  const onCancel = () => {
    mapMarkers.pop();
    // setMarkers(prev => prev.slice(0, prev.length - 1));
    context.setSelectedPosition(undefined);
    setModalVisible(false);
  };

  const onConfirm = () => {
    const selectedMarker = mapMarkers[mapMarkers.length - 1];
    mapMarkers.pop();
    // setMarkers(prev => prev.slice(0, prev.length - 1));
    const newMapRegion = {
      ...DefaultRegion,
      latitude: selectedMarker.coordinate.latitude,
      longitude: selectedMarker.coordinate.longitude,
    };
    context.setSelectedPosition(newMapRegion);
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
    <View>
      <Modal {...modalProps} />
      <MapView
        onPress={onPress}
        style={MapDimentions}
        region={region}
        showsUserLocation={true}
        customMapStyle={mapStyle}>
        {mapMarkers.length > 0 &&
          mapMarkers.map(mapMarker => {
            return (
              <Marker key={mapMarker.id} {...mapMarker}>
                <CustomMarker type={mapMarker.type} />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

export default Map;
