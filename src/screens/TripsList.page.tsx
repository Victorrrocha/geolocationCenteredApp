import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Page from '../components/Page';
import {Box, Text} from 'native-base';
import {useTheme} from 'styled-components';
import {Theme} from '../styled/theme';
import TripCard from '../components/TripCard';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';

function TripsList({navigation}: BottomTabScreenProps<ParamListBase>) {
  // console.log('Marker List rerender');
  const theme = useTheme() as Theme;

  let tripsList = useSelector((state: RootState) => state.geolocation.trips);

  if (tripsList.length === 0) {
    return (
      <Page>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text color={theme.color.secondary} italic>
            No trips yet, go out there and make some memories
          </Text>
        </Box>
      </Page>
    );
  }

  return (
    <Page>
      {tripsList.length > 0 && (
        <FlatList
          data={tripsList}
          renderItem={({item}) => (
            <TripCard {...item} navigation={navigation} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Page>
  );
}

export default TripsList;
