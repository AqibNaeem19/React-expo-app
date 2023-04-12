import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
// import Chatbot from '../components/Chatbot';

// Context for sharing authenticated user credentials. includes token
import { CredentialsContext } from '../components/CredentialsContext';

/* 
  Navigation props is coming from react-navigation. <Stack.Navigation /> automatically
  passes navigation prop to all of <Stack.Screen />. Moreover, components which are nested
  inside another component cannot be declared as <Stack.Screen /> and cannot get navigation
  prop. Only the stand-alone components which are not nested got navigation prop.

*/
const Welcome = ({ navigation}) => {
  // Context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { name, email } = storedCredentials;
  return (
    <>
    <StatusBar style="auto" />
      <Navbar navigation={navigation} />
      <Text>name: {name} </Text>
      <Text>email: {email}</Text>
      {/* <Chatbot /> */}
    </>
  );
};

export default Welcome;
