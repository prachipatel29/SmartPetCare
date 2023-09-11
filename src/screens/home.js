import React, {useEffect, useState} from 'react';
import {Box, Button, Flex,  HStack, Stack, Text, VStack} from 'native-base';
import { Linking} from "react-native";
import {getAllData} from '../utils/user';
import {Notifications} from 'react-native-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../apptheme';
import Header from '../components/common/header';
import Profile from '../components/common/profile';
import {useStore} from '../../zustand/store/useStore';
import PetcareModal from '../components/petcareModal';



const HomeScreen = ({navigation}) => {
  const userEmail = useStore(state => state.user.email);
  const user = useStore(state =>state.user)
  const isAuthenticated = useStore(state => state.user.isAuthenticated)
  const setPetDetails = useStore(state => state.updatePetInfo)
  const setVaccineData = useStore(state => state.updateVaccine)
  const setAppointmets = useStore(state => state.updateAppointments)
  const [petModal, setPetModal] = useState(false)
  
  useEffect(() => {
    if(isAuthenticated && user?.uid){
      getAllData(user.uid).then(res => {
        if (res.status) {
          setPetDetails(res?.petDetails)
          setAppointmets(res?.appointment ? res?.appointment : [])
          if(res?.vaccineData){
            setVaccineData(res?.vaccineData)
          }

          if(!res?.petDetails){
            setPetModal(true)
          }
        }else{
          setPetModal(true)
        }
      });
    }else{
      setPetModal(false)
    }
  }, [user?.uid, isAuthenticated])

  const handleUrl = async (url) => {
    await Linking.openURL(url);
  }

  //Handles notification sending for feeding the pet
  const handleNotification = () => {
    Notifications.postLocalNotification({
      title: "Feed Time!",
      body: "It's time to feed your pet!",
      extra: "data"
  });
  }
  return (
    <Box
      safeArea
      paddingX={4}
      style={{
        flex: 1,
        backgroundColor: colors.background,
        color: 'white',
      }}>
      <Flex
        flexDirection={'row'}
        justifyContent={'space-between'}
        marginBottom="6">
        <Header label={'Welcome to Petcare'}>
          <Ionicons name="heart" color={colors.headeline} size={20} />
        </Header>
        <Profile email={userEmail} navigation={navigation} />
      </Flex>
      <Stack marginTop={6}  height="80%" justifyContent="center" >
        <HStack  justifyContent="space-evenly">
              <Button onPress = {handleNotification}  width="120" backgroundColor={colors.backgroundLight} >
                <Ionicons name="logo-octocat" color={colors.headeline} size={60} />
                <Text color="white">Feeding</Text>
              </Button>

              <Button onPress = { () => navigation.navigate('Appointment') } width="120" backgroundColor={colors.backgroundLight}>
                <VStack  alignItems="center">
                  <Ionicons name="calendar" color={colors.headeline} size={60} />
                  <Text color="white">Appointment</Text>
                </VStack>
              </Button>
        </HStack>

        <HStack mt="10"  justifyContent="space-evenly">
          <Button onPress={() => handleUrl(' https://miteshgabani.github.io/Temperature/')}  width="120" backgroundColor={colors.backgroundLight} >
            <VStack  alignItems="center">
              <Ionicons name="thermometer" color={colors.headeline} size={60} />
              <Text color="white">Temperature</Text>
            </VStack>
          </Button>
          <Button onPress = { () => navigation.navigate('Report') }  width="120" backgroundColor={colors.backgroundLight}>
            <VStack alignItems="center" width="100">
              <Ionicons name="document-text" color={colors.headeline} size={60} />
              <Text color="white">Report</Text>
            </VStack>
          </Button>
        </HStack>
      </Stack>
      <PetcareModal visible= {petModal} />
    </Box>
  );
};
export default HomeScreen;
