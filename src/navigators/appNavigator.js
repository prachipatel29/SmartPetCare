import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '../../apptheme';
// import WorkoutInstruction from '../screens/workoutInstruction';
// import MainNavigator from './mainNavigator';
// import WorkoutScreen from '../screens/workout';
import HomeScreen from '../screens/home';
import SettingsScreen from '../screens/settings';
import AppointmentScreen from '../screens/appointment';
import ReportScreen from '../screens/report';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
        <Stack.Screen
          name="Appointment"
          component={AppointmentScreen}
          options={{
            title: 'Appointments',
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        />

        <Stack.Screen
          name="Report"
          component={ReportScreen}
          options={{
            title: 'Report',
            headerTintColor: colors.text,
            headerStyle: {
              backgroundColor: colors.background,
            },
          }}
        />
      </Stack.Navigator>
    </>
  );
};
export default AppNavigator;
