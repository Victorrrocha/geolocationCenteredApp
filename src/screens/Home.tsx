import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
} from 'react';
import {init} from '../geolocation-service/main';
import {View} from 'react-native';
import Map from '../components/Map';
import {MapProps} from '../components/Map';
import {GeolocationContext} from '../context/GeolocationContext';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';

export default function Home({
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  const context = useContext(GeolocationContext);
  let markers = useRef([]);
  const initializeMap = useCallback(() => {
    init().then(response => {
      if (response) {
        if (
          JSON.stringify(context.store.position) !== JSON.stringify(response)
        ) {
          console.log('Update position');
          context.setCurrentPosition(response);
        }
      }
    });
  }, [context]);

  console.log('Home PAGE rerender');

  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  useEffect(() => {
    markers.current = context.store.markers;
  }, [context.store.markers]);

  const mapProps: MapProps = {
    region: context.store.position,
    mapMarkers: [...markers.current],
  };

  return (
    <View>
      <Map {...mapProps} navigation={navigation} />
    </View>
  );
}
