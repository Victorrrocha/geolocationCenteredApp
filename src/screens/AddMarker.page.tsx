import {Controller, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Input from '../components/styled/Input.styled';
import Layout from '../components/Layout';
import {Box, Row, Text} from 'native-base';
import Button from '../components/styled/Button.styled';
import Form from '../components/styled/Form.styled';
import CustomMarker from '../components/CustomMarker';
import {HStack} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {addMarker} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';
import Page from '../components/Page';
import FoldersDropdown from '../components/FoldersDropdown';
import uuid from 'react-native-uuid';
import CurrenciesDropdown from '../components/CurrenciesDropdown';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {ParamListBase} from '@react-navigation/native';

const defaultState = {
  heart: false,
  shopping: false,
  food: false,
  amusement: false,
  culture: false,
};

function AddMarker({navigation}: BottomTabScreenProps<ParamListBase>) {
  // console.log('Add marker page re rendered');
  const dispatch = useDispatch();
  const position = useSelector(
    (state: RootState) => state.geolocation.position,
  );
  const selectedPosition = useSelector(
    (state: RootState) => state.geolocation.selectedPosition,
  );

  const currentFolder = useSelector(
    (state: RootState) => state.geolocation.currentFolder,
  );

  const [typeSelected, setTypeSelected] = useState({
    heart: true,
    shopping: false,
    food: false,
    amusement: false,
    culture: false,
  });

  const defaultPosition =
    selectedPosition !== undefined ? selectedPosition : position;

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      id: '',
      coordinate: defaultPosition,
      folder: currentFolder,
      title: '',
      description: '',
      price: '',
      currency: 'USD',
      type: 'HEART',
    },
  });

  const onChangeCurrency = (currency: string) => {
    setValue('currency', currency);
  };

  const onSelectType = (type: string, obj: any) => {
    if (getValues().type === type) {
      return;
    }
    setTypeSelected(() => {
      return {...defaultState, ...obj};
    });
    setValue('type', type);
  };

  const onSelectFolder = (folder: string) => {
    setValue('folder', folder);
  };

  const onSubmit = () => {
    setValue('id', uuid.v4().toString());
    setValue('coordinate', defaultPosition);
    dispatch(addMarker(getValues()));
    reset();
    setTypeSelected(() => {
      return {...defaultState, heart: true};
    });
    navigation.navigate('HomePage');
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
                placeholder="Title"
              />
            )}
            name="title"
          />

          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Description (optional)"
              />
            )}
            name="description"
          />

          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <Row space={2}>
                <Box w="70%">
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Price (optional)"
                    keyboardType="numeric"
                  />
                </Box>
                <CurrenciesDropdown onSelect={onChangeCurrency} />
              </Row>
            )}
            name="price"
          />

          <HStack justifyContent="center" space={7} mb="15px">
            <Pressable onPress={() => onSelectType('HEART', {heart: true})}>
              <CustomMarker
                size="large"
                type="HEART"
                selected={typeSelected.heart}
              />
            </Pressable>
            <Pressable
              onPress={() => onSelectType('SHOPPING', {shopping: true})}>
              <CustomMarker
                size="large"
                type="SHOPPING"
                selected={typeSelected.shopping}
              />
            </Pressable>
            <Pressable onPress={() => onSelectType('FOOD', {food: true})}>
              <CustomMarker
                size="large"
                type="FOOD"
                selected={typeSelected.food}
              />
            </Pressable>
            <Pressable
              onPress={() => onSelectType('AMUSEMENT', {amusement: true})}>
              <CustomMarker
                size="large"
                type="AMUSEMENT"
                selected={typeSelected.amusement}
              />
            </Pressable>
            <Pressable onPress={() => onSelectType('CULTURE', {culture: true})}>
              <CustomMarker
                size="large"
                type="CULTURE"
                selected={typeSelected.culture}
              />
            </Pressable>
          </HStack>

          <Box>
            <Text color="coolGray.600">Add to the trip:</Text>
            <FoldersDropdown onSelect={onSelectFolder} />
          </Box>

          <Box flex="1" justifyContent="flex-end">
            <Button title="Create Marker" onPress={handleSubmit(onSubmit)} />
          </Box>
        </Form>
      </Layout>
    </Page>
  );
}

export default AddMarker;
