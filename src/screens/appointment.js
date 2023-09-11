import {Box, Flex, Heading, VStack, Text, Stack, Button, HStack, ScrollView, } from 'native-base';
import React, {useState, useEffect} from 'react';
import {colors} from '../../apptheme';
import DatePicker from 'react-native-date-picker'
import {useStore} from '../../zustand/store/useStore';
import { addAppointmentFirebase } from '../utils/user';
import auth from '@react-native-firebase/auth';


const AppointmentScreen = ()=>{
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const appointments = useStore(state => state.appointments)
    const setAppointmets = useStore(state => state.updateAppointments)

    const handleNewAppointment = (date) => {
        if(typeof date === "object"){
          const appointment = {
            time: date.toLocaleTimeString(),
            date: date.toLocaleDateString(),
            id : date.toLocaleTimeString().split(" ").join("-")+date.toLocaleDateString()
          }
          addAppointmentFirebase(auth().currentUser.uid, [...appointments, appointment], setAppointmets)
        }
        
    }
    return(
        <Box background={colors.background} flex={'1'} paddingX={3} safeArea>
      <Flex justifyContent={'space-between'} height={'95%'}>
        <ScrollView marginTop={'6'}  >
        {
          Boolean(appointments?.length) && appointments.map((app, id) => (
            <VStack key = {id} borderBottom = "1" marginBottom="2" borderColor={'gray.600'} borderBottomWidth="1">
              <HStack alignItems="center">
              <Text fontSize = "18px" color={colors.paragragph} fontWeight="600">Date: </Text>
              <Text color={colors.text}>{app.date} </Text>
              </HStack>

              <HStack alignItems="center">
              <Text fontSize = "18px" color={colors.paragragph} fontWeight="600">Time: </Text>
              <Text color={colors.text}>{app.time} </Text>
              </HStack>
            </VStack>
          ))
          
        }
        </ScrollView>
            <Button onPress={() => setOpen(true)} width={"full"} backgroundColor={colors.primary}> Add New Appointment</Button>
        </Flex>
        <DatePicker
        modal
        open={open}
        minimumDate={date}
        mode={'datetime'}
        date={date}
        onConfirm={(date) => {
          handleNewAppointment(date)
          setOpen(false)
        //   setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </Box>

    )
}
export default AppointmentScreen