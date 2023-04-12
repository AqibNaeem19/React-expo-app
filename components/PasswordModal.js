import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';

export default function PasswordModal() {
  const [modalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (


    <Modal visible={modalVisible} transparent={true}>
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={() => handleModalClose()}
      >
        <View ref={modalRef} style={styles.modal}>
          <Text style={styles.modalText}>This is a modal!</Text>
        </View>
      </TouchableOpacity>
    </Modal>

  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 20
  },
});