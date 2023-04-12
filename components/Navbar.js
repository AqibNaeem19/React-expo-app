import React, { useState, useContext, useRef, useEffect } from 'react';
import { Pressable, Text, View, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context for sharing authenticated user credentials. includes token
import { CredentialsContext } from '../components/CredentialsContext';
import {
  NavbarContainer,
  NavbarText,
  NavbarButton,
} from '../components/styles';
import { Colors } from '../components/styles';

const { tertiary, brand } = Colors;

const Navbar = ({ navigation }) => {
  // Context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  // Logsout the user
  const clearLogin = () => {
    AsyncStorage.removeItem('flowerCribCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch(error => {
        console.log(error);
      })
  }

  const [showOptions, setShowOptions] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const closeModal = () => {
      setShowOptions(false);
    };

    const modal = modalRef.current;

    if (modal) {
      modal.addEventListener('click', closeModal);
    }

    return () => {
      if (modal) {
        modal.removeEventListener('click', closeModal);
      }
    };
  }, [modalRef]);

  const handleMenuClick = () => {
    setShowOptions(!showOptions);
  };

  const handleCloseModal = () => {
    setShowOptions(false);
  };

  return (
    <NavbarContainer>
      <Pressable accessibilityLabel="More options menu" onPress={handleMenuClick}>
        <Ionicons name="options" size={24} color={tertiary} />
      </Pressable>

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={{ flex: 1 }}>
            <View ref={modalRef} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'white' }}>
              <TouchableOpacity style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => console.log("Leave a review")}>
                <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: 120, alignItems: 'center' }}>
                  <Ionicons name="star-outline" size={24} color={tertiary} />
                  <Text style={{ marginLeft: 10 }}>Leave a review</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={() => console.log("Settings")}>
                <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: 120, alignItems: 'center' }}>

                  <Ionicons name="settings-outline" size={24} color={tertiary} />
                  <Text style={{ marginLeft: 10 }}>Settings</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} onPress={clearLogin}>
                <View style={{ paddingVertical: 10, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: 120, alignItems: 'center' }}>

                  <Ionicons name="log-out-outline" size={24} color={brand} />
                  <Text style={{ marginLeft: 10 }}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <NavbarText>MY APP</NavbarText>
      <NavbarButton onPress={() => navigation.navigate("Info")}>
        <Ionicons name="apps-sharp" size={24} color={tertiary} />
      </NavbarButton>
    </NavbarContainer>

  );
};



export default Navbar;