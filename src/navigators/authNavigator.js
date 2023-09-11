import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import CreateAccount from '../screens/createAccount';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="createAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
