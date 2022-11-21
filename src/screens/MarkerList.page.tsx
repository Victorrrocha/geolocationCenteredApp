import React, {useContext} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import MarkerCard from '../components/MarkerCard';
import {GeolocationContext} from '../context/GeolocationContext';
import {SafeAreaView} from 'react-native-safe-area-context';

function MarkerList() {
  console.log('Marker List rerender');
  const context = useContext(GeolocationContext);
  let markersList = context.store.markers;

  return (
    <SafeAreaView style={styles.container}>
      {markersList.length > 0 && (
        <FlatList
          data={markersList}
          renderItem={({item}) => <MarkerCard {...item} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
  },
});

export default MarkerList;
