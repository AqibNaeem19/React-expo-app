import React from 'react';
import { Colors } from '../components/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Credentials Context for authenticated user.
import { CredentialsContext } from '../components/CredentialsContext';

// Stand-Alone Screens
import Login from '../screens/Login'
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome'
import Info from '../screens/Info';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createNativeStackNavigator();
const { tertiary } = Colors;

/*
  Only the components which are not nested inside other components could be declared
  inside <Stack.Screen /> component and gets the navigation prop. Nested elements will
  not get navigation prop.
*/

const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                paddingLeft: 20
              },
            }}
            initialRouteName="Login"
          >
            {storedCredentials ?
              (
                <>
                  <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="Info" component={Info} />
                </>

              ) : (
                <>
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                </>
              )
            }
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
}

export default RootStack;