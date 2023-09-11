import React, {useState,useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useStore} from '../../zustand/store/useStore';


import SplashScreen from '../screens/splashScreen';
import AppNavigator from './appNavigator';
import AuthNavigator from './authNavigator';
import auth from '@react-native-firebase/auth';


const Navigator = ({setUser}) => {
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useStore(state => state.user.isAuthenticated);
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated);
  

  const setUserData = useStore(state => state.manageUser);
  useEffect( () => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  const onAuthStateChanged = user => {
    if (user && user.uid) {
      setIsAuthenticated(true);
      setUserData({...user.providerData[0], uid: user.uid});
      
    }
    setIsLoading(false)
  };

  return (
    <NavigationContainer>
      { isLoading ? <SplashScreen /> : isAuthenticated ? <AppNavigator /> : <AuthNavigator />  }
    </NavigationContainer>
  );
};
export default Navigator;
