import React, {useEffect} from 'react';
import {init} from '../geolocation-service/main';
import Map from '../components/Map';
import {MapProps} from '../components/Map';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentPosition} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';

export default function Home({
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  console.log('Home PAGE rerender');

  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.geolocation.markers);
  const position = useSelector(
    (state: RootState) => state.geolocation.position,
  );

  useEffect(() => {
    init().then(response => {
      if (response && JSON.stringify(position) !== JSON.stringify(response)) {
        dispatch(setCurrentPosition(response));
      }
    });
  });

  const mapProps: MapProps = {
    region: position,
    mapMarkers: [...markers],
  };

  return (
    <>
      <Map {...mapProps} navigation={navigation} />
    </>
  );
}
