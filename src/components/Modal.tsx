import {Box} from 'native-base';
import React from 'react';
import {Text, Modal as ModalComponent} from 'react-native';
import theme from '../styled/theme';
import Button from './styled/Button.styled';

export type ModalProps = {
  isModalVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function Modal({isModalVisible, onCancel, onConfirm}: ModalProps) {
  return (
    <ModalComponent
      animationType="slide"
      transparent={true}
      onRequestClose={onCancel}
      visible={isModalVisible}>
      <Box
        flex={1}
        flexDirection="column"
        justifyContent="flex-end"
        px="20px"
        pb="70px">
        <Box padding={5} bgColor="#fff">
          <Text>Create Marker here?</Text>
          <Box mt="15px" flexDirection="row" justifyContent="flex-end">
            <Button
              color={theme.color.secondary}
              title="Cancel"
              onPress={onCancel}
            />
            <Box ml="10px">
              <Button
                color={theme.color.primary}
                title="Confirm"
                onPress={onConfirm}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </ModalComponent>
  );
}

export default Modal;
