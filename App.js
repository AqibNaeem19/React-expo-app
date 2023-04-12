// import React, { useState } from 'react';
// import { NativeBaseProvider } from 'native-base'
// import AppLoading from 'expo-app-loading';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Context for sharing authenticated user credentials. includes token
// import { CredentialsContext } from './components/CredentialsContext';

// // Root Stack
// import RootStack from './navigators/RootStack';

// const App = () => {
//   const [appReady, setAppReady] = useState(false);
//   const [storedCredentials, setStoredCredentials] = useState("");

//   // Checks async storage for user login credentials
//   const checkLoginCredentials = () => {
//     AsyncStorage.getItem('flowerCribCredentials')
//       .then((result) => {
//         if (result !== null) {
//           setStoredCredentials(JSON.parse(result));
//         } else {
//           setStoredCredentials(null);
//         }
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   }

//   if (!appReady) {
//     return (
//       <AppLoading
//         startAsync={checkLoginCredentials}
//         onFinish={() => setAppReady(true)}
//         onError={console.warn}
//       />
//     )
//   }

//   // NativeBaseProvider is important for using built-in components from native-base.io
//   return (
//     <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
//       <NativeBaseProvider>
//         <RootStack />
//       </NativeBaseProvider>
//     </CredentialsContext.Provider>
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
// import { NativeBaseProvider } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

// Context for sharing authenticated user credentials. includes token
import { CredentialsContext } from './components/CredentialsContext';

// Root Stack
import RootStack from './navigators/RootStack';

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  // Checks async storage for user login credentials
  const checkLoginCredentials = async () => {
    try {
      const result = await AsyncStorage.getItem('flowerCribCredentials');
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await checkLoginCredentials();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  // NativeBaseProvider is important for using built-in components from native-base.io
  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
      {/* <NativeBaseProvider> */}
        {appReady ? <RootStack /> : null}
      {/* </NativeBaseProvider> */}
    </CredentialsContext.Provider>
  );
};

export default App;
