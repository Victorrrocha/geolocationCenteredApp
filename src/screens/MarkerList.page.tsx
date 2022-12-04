import React from 'react';
import {FlatList} from 'react-native';
import MarkerCard from '../components/MarkerCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Page from '../components/Page';

function MarkerList() {
  console.log('Marker List rerender');
  let markersList = useSelector(
    (state: RootState) => state.geolocation.markers,
  );

  return (
    <Page>
      {markersList.length > 0 && (
        <FlatList
          data={markersList}
          renderItem={({item}) => <MarkerCard {...item} />}
          keyExtractor={item => item.id}
        />
      )}
    </Page>
  );
}

export default MarkerList;
