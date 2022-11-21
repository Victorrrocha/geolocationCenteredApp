import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import MarkerCard from '../components/MarkerCard';
import {GeolocationContext} from '../context/GeolocationContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';

function MarkerList({navigation}: BottomTabScreenProps<ParamListBase>) {
  console.log('Marker List rerender');
  const context = useContext(GeolocationContext);
  let markersList = context.store.markers;
  // const [markersList, setMarkersList] = useState([]);
  console.log('list of markers' + markersList);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setMarkersList(context.store.markers);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

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
