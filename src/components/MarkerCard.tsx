import {Text, Pressable} from 'react-native';
import MapMarker from '../interfaces/MapMarker.interface';
import Card from './Card';
import CustomMarker from './CustomMarker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Box} from 'native-base';
import {useDispatch} from 'react-redux';
import {deleteMarker} from '../redux/geolocationSlice';

const MarkerCard = ({
  title,
  description,
  price,
  currency,
  type,
  id,
}: MapMarker) => {
  const dispatch = useDispatch();
  const onDelete = () => {
    dispatch(deleteMarker(id));
  };

  const calculatedPrice = `${parseFloat(price + '').toFixed(2)} ${currency}`;

  return (
    <Card>
      <CustomMarker size="large" type={type} />
      <Box flex={1} px="15px">
        <Text>{title}</Text>
        {description && <Text>{description}</Text>}
        {price && <Text>{calculatedPrice}</Text>}
      </Box>
      <Pressable onPress={() => onDelete()}>
        <MaterialCommunityIcons name="delete" color={'#86b31d'} size={25} />
      </Pressable>
    </Card>
  );
};

export default MarkerCard;
