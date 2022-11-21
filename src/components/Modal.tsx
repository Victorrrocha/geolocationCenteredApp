import React from 'react';
import {Text, View, Modal as ModalComponent, StyleSheet} from 'react-native';
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
      <View style={styles.modalView}>
        <View style={styles.modalContainer}>
          <Text>Create Marker here?</Text>
          <View style={styles.modalButtonsContainer}>
            <Button
              color={theme.color.secondary}
              title="Cancel"
              onPress={onCancel}
            />
            <View style={styles.modalButton}>
              <Button
                color={theme.color.primary}
                title="Confirm"
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </ModalComponent>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  modalContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  modalButtonsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    marginLeft: 10,
  },
});

export default Modal;
