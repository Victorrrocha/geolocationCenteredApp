import {Controller, useForm} from 'react-hook-form';
import React, {useContext, useState, useEffect} from 'react';
import {Text, Pressable} from 'react-native';
import Input from '../components/styled/Input.styled';
import Layout from '../components/Layout';
import Button from '../components/styled/Button.styled';
import {useTheme} from 'styled-components';
import Form from '../components/styled/Form.styled';
import {Theme} from '../styled/theme';
import {GeolocationContext} from '../context/GeolocationContext';
import CustomMarker from '../components/CustomMarker';
import InlineRow from '../components/styled/InlineRow';
import MapMarker from '../interfaces/MapMarker.interface';

const defaultState = {
  heart: false,
  shopping: false,
  food: false,
  amusement: false,
  culture: false,
};

function AddMarker() {
  console.log('Add marker page re rendered');
  const context = useContext(GeolocationContext);
  const [typeSelected, setTypeSelected] = useState({
    heart: true,
    shopping: false,
    food: false,
    amusement: false,
    culture: false,
  });
  console.log('Current Position Selected');
  console.log(context.store.selectedPosition);

  const defaultPosition =
    context.store.selectedPosition || context.store.position;

  console.log('Selected Position');
  console.log(defaultPosition);

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
    // if already selected, return
    if (getValues().type === type) {
      return;
    }
    //if new value, update setSelectedType and set Value to new type
    setTypeSelected(() => {
      return {...defaultState, ...obj};
    });
    setValue('type', type);
  };

  const onSubmit = (data: MapMarker) => {
    setValue('id', data.title);
    // console.log(data);
    context.addNewMarker(getValues());
    reset();
  };

  return (
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

        <InlineRow>
          <Pressable onPress={() => onSelectType('HEART', {heart: true})}>
            <CustomMarker
              size="large"
              type="HEART"
              selected={typeSelected.heart}
            />
          </Pressable>
          <Pressable onPress={() => onSelectType('SHOPPING', {shopping: true})}>
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
        </InlineRow>

        <Button
          color={theme.color.primary}
          title="Create Marker"
          onPress={handleSubmit(onSubmit)}
        />
      </Form>
    </Layout>
  );
}

export default AddMarker;
