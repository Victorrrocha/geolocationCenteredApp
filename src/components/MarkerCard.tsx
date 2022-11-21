import {useContext} from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import MapMarker from '../interfaces/MapMarker.interface';
import Card from './Card';
import CustomMarker from './CustomMarker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {GeolocationContext} from '../context/GeolocationContext';

const MarkerCard = ({title, description, type, id}: MapMarker) => {
  const context = useContext(GeolocationContext);
  const onDelete = () => {
    context.deleteMarker(id);
  };

  return (
    <Card>
      <CustomMarker size="large" type={type} />
      <View style={styles.info}>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
      <Pressable onPress={() => onDelete()}>
        <MaterialCommunityIcons name="delete" color={'#86b31d'} size={25} />
      </Pressable>
    </Card>
  );
};

const styles = StyleSheet.create({
  icon: {},
  info: {
    flex: 1,
    paddingHorizontal: 15,
  },
  button: {},
});

export default MarkerCard;
