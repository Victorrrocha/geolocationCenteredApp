import React, {useState} from 'react';
import {FlatList} from 'react-native';
import MarkerCard from '../components/MarkerCard';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Page from '../components/Page';
import {Box, Column, Row, Text} from 'native-base';
import {useTheme} from 'styled-components';
import {Theme} from '../styled/theme';
import MapMarker from '../interfaces/MapMarker.interface';
import CurrenciesDropdown from '../components/CurrenciesDropdown';
import {ConfigState} from '../redux/conversionSlice';

function MarkerList({route}: any) {
  // console.log('Marker List rerendered');

  const {folder} = route.params;
  const theme = useTheme() as Theme;

  let quotesObject = useSelector((state: RootState) => state.conversion);

  let markersList = useSelector(
    (state: RootState) => state.geolocation.markers,
  ).filter((marker: MapMarker) => {
    return marker.folder === folder;
  });

  const [totalExpenses, setTotalExpenses] = useState(getTotal('USD'));

  if (markersList.length === 0) {
    return (
      <Page>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text color={theme.color.secondary} italic>
            No markers yet, go out there and make some memories
          </Text>
        </Box>
      </Page>
    );
  }

  function calculateConvertedValue(
    price: number,
    originalCurrency: keyof ConfigState,
    destinationCurrency: keyof ConfigState,
  ) {
    return price * quotesObject[originalCurrency][destinationCurrency];
  }

  function getTotal(currency: string) {
    let total = markersList.reduce((sum, current: MapMarker) => {
      if (current.price === undefined) {
        return sum;
      }
      return (
        sum +
        calculateConvertedValue(
          +current.price,
          current.currency as keyof ConfigState,
          currency as keyof ConfigState,
        )
      );
    }, 0);
    return total;
  }

  const setExpenses = (currency: string) => {
    setTotalExpenses((): number => {
      // console.log(getTotal(currency));
      return getTotal(currency);
    });
  };

  return (
    <Page>
      {markersList.length > 0 && (
        <>
          <Column
            borderBottomColor="coolGray.400"
            borderBottomWidth="1"
            paddingBottom="1"
            marginBottom="3">
            <Text fontSize="20">Total:</Text>
            <Row space={2}>
              <CurrenciesDropdown onSelect={setExpenses} />
              <Box width="70%">
                <Text fontSize="4xl">{totalExpenses}</Text>
              </Box>
            </Row>
          </Column>
          <FlatList
            data={markersList}
            renderItem={({item}) => <MarkerCard {...item} />}
            keyExtractor={item => item.id}
          />
        </>
      )}
    </Page>
  );
}

export default MarkerList;
