import React, {useEffect} from 'react';
import {init} from '../geolocation-service/main';
import Map from '../components/Map';
import {MapProps} from '../components/Map';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {setCurrentFolder, setCurrentPosition} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';
import {Box} from 'native-base';
import FoldersDropdown from '../components/FoldersDropdown';

import {
  GET_DOLLAR,
  GET_EURO,
  GET_GBP,
  GET_REAL,
} from '../graphql/queries/queryQuoteCurrencies';
import {useGetQuotes} from '../utils/useGetQuotes';

export default function Home({
  navigation,
}: BottomTabScreenProps<ParamListBase>) {
  console.log('Home PAGE rerender');

  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.geolocation.markers);
  const currentFolder = useSelector(
    (state: RootState) => state.geolocation.currentFolder,
  );
  const position = useSelector(
    (state: RootState) => state.geolocation.position,
  );

  useGetQuotes(GET_EURO, 'EUR');
  useGetQuotes(GET_DOLLAR, 'USD');
  useGetQuotes(GET_REAL, 'BRL');
  useGetQuotes(GET_GBP, 'GBP');

  useEffect(() => {
    if (currentFolder === 'All') {
      init().then(response => {
        if (response && JSON.stringify(position) !== JSON.stringify(response)) {
          dispatch(setCurrentPosition(response));
        }
      });
    }
  });

  const mapProps: MapProps = {
    region: position,
    mapMarkers: [...markers],
  };

  return (
    <Box>
      <FoldersDropdown
        onSelect={current => dispatch(setCurrentFolder(current))}
      />
      <Map {...mapProps} navigation={navigation} />
    </Box>
  );
}
