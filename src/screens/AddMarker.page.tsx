import {Controller, useForm} from 'react-hook-form';
import React, {useState} from 'react';
import {Text, Pressable} from 'react-native';
import Input from '../components/styled/Input.styled';
import Layout from '../components/Layout';
import {Box, Button} from 'native-base';
import {useTheme} from 'styled-components';
import Form from '../components/styled/Form.styled';
import {Theme} from '../styled/theme';
import CustomMarker from '../components/CustomMarker';
import MapMarker from '../interfaces/MapMarker.interface';
import {HStack} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {addMarker} from '../redux/geolocationSlice';
import {RootState} from '../redux/store';
import Page from '../components/Page';

const defaultState = {
  heart: false,
  shopping: false,
  food: false,
  amusement: false,
  culture: false,
};

function AddMarker() {
  console.log('Add marker page re rendered');
  const dispatch = useDispatch();
  const position = useSelector(
    (state: RootState) => state.geolocation.position,
  );
  const selectedPosition = useSelector(
    (state: RootState) => state.geolocation.selectedPosition,
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

  const theme = useTheme() as Theme;
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
      title: '',
      description: '',
      type: 'HEART',
    },
  });

  const onSelectType = (type: string, obj: any) => {
    if (getValues().type === type) {
      return;
    }
    setTypeSelected(() => {
      return {...defaultState, ...obj};
    });
    setValue('type', type);
  };

  const onSubmit = (data: MapMarker) => {
    setValue('id', data.title);
    setValue('coordinate', defaultPosition);
    dispatch(addMarker(getValues()));
    reset();
    setTypeSelected(() => {
      return {...defaultState, heart: true};
    });
  };

  return (
    <Page>
      <Layout>
        <Form>
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

          {errors.title && <Text>Precisa adicionar um título</Text>}

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

          <Box flex="1" justifyContent="flex-end">
            <Button
              color={theme.color.primary}
              onPress={handleSubmit(onSubmit)}>
              Create Marker
            </Button>
          </Box>
        </Form>
      </Layout>
    </Page>
  );
}

export default AddMarker;
