import Page from '../components/Page';
import {useForm, Controller} from 'react-hook-form';
import Layout from '../components/Layout';
import Input from '../components/styled/Input.styled';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {Box, Flex, Text} from 'native-base';
import Button from '../components/styled/Button.styled';
import Form from '../components/styled/Form.styled';
import {useDispatch, useSelector} from 'react-redux';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';
import {RootState} from '../redux/store';
import MapMarker from '../interfaces/MapMarker.interface';
import Trip from '../interfaces/Trip.interface';
import uuid from 'react-native-uuid';
import {
  addMarker,
  addTrip,
  resetNewTripSelectedPosition,
  setCurrentFolder,
} from '../redux/geolocationSlice';

const initialValues: Trip = {
  id: uuid.v4().toString(),
  title: '',
  destination: '',
  departure: new Date(),
  arrival: new Date(),
};

const CreateTrip = ({navigation}: BottomTabScreenProps<ParamListBase>) => {
  // console.log('New Trip Rerendered');
  const dispatch = useDispatch();
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({defaultValues: initialValues});

  const newTripSelectedPosition: MapMarker = useSelector(
    (state: RootState) => state.geolocation.newTripSelectedPosition,
  );
  const destination = newTripSelectedPosition
    ? `${newTripSelectedPosition?.coordinate.latitude}, ${newTripSelectedPosition?.coordinate.latitude}`
    : '';

  const onSubmit = () => {
    setValue('destination', destination);
    const savedObject: Trip = {
      ...getValues(),
      destination: destination,
      departure: getValues().departure.toLocaleString(),
      arrival: getValues().arrival.toLocaleString(),
    };
    dispatch(
      addMarker({...newTripSelectedPosition, folder: savedObject.title}),
    );
    dispatch(resetNewTripSelectedPosition());
    dispatch(setCurrentFolder(savedObject.title));
    dispatch(addTrip(savedObject));
    reset();
    navigation.navigate('Home');
  };

  const openDestinationMap = () => {
    navigation.navigate('SelectDestination');
  };

  const showDatePicker = (value: any) => {
    DateTimePickerAndroid.open({
      value:
        value === 'departure'
          ? (getValues().departure as Date)
          : (getValues().arrival as Date),
      onChange: (event, selectedDate) => {
        const currentDate = selectedDate;
        setValue(value, currentDate);
      },
      mode: 'date',
    });
  };

  return (
    <Page>
      <Layout>
        <Form>
          <Box>
            {errors.title && <Text color="red.900">Cannot be empty</Text>}
          </Box>
          <Controller
            control={control}
            rules={{required: true}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Title*"
              />
            )}
            name="title"
          />

          <Box>
            {errors.title && <Text color="red.900">Cannot be empty</Text>}
          </Box>
          <Button
            title="Find Destination in map"
            onPress={openDestinationMap}
          />
          <Input
            editable={false}
            value={destination}
            placeholder="Destination"
          />

          <Flex
            flexDirection="row"
            alignItems="center"
            bgColor="white"
            mb="15px"
            borderRadius="5px">
            <Box width="50%">
              <Button
                title="Set Departure"
                onPress={() => showDatePicker('departure')}
              />
            </Box>
            <Controller
              name="departure"
              control={control}
              render={({field: {value}}) => (
                <Text ml={4}>{(value as Date).toLocaleDateString()}</Text>
              )}
            />
          </Flex>

          <Flex
            flexDirection="row"
            alignItems="center"
            bgColor="white"
            mb="15px"
            borderRadius="5px">
            <Box width="50%">
              <Button
                title="Set Arrival"
                onPress={() => showDatePicker('arrival')}
              />
            </Box>
            <Controller
              name="arrival"
              control={control}
              render={({field: {value}}) => (
                <Text ml={4}>{(value as Date).toLocaleDateString()}</Text>
              )}
            />
          </Flex>

          <Box flex="1" justifyContent="flex-end">
            <Button title="Create Trip" onPress={handleSubmit(onSubmit)} />
          </Box>
        </Form>
      </Layout>
    </Page>
  );
};

export default CreateTrip;
