import {Box, Button, Flex, Heading, VStack, Text, Stack, useDisclose, Input, } from 'native-base';
import React, {useState, useEffect} from 'react';
import {TouchableOpacity, KeyboardAvoidingView} from "react-native"
import {colors} from '../../apptheme';
import {useStore} from '../../zustand/store/useStore';
import {logoutUser, addPetDetailsFirebase} from '../utils/user';
import auth from '@react-native-firebase/auth';
import { Actionsheet } from "native-base";
import useKeyboardBottomInset from "../hooks/useKeyboardBottomInset"

const SettingsScreen = () => {
  const [userInfo, setUserInfo] = useState({})
  const petInfo = useStore(state =>({ name: state.name, age: state.age}))
  const setPetInfo = useStore(state => state.updatePetInfo)
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated);
  const {isOpen,onOpen,onClose} = useDisclose()
  const [editedValue, setEditedValue] = useState({label: "", value: ""})
  const [currentCreds, setCurrentCreds] = useState({email: "", password: ""})
  const bottomInset = useKeyboardBottomInset()

  useEffect(() => {
    updateValues()
  }, [])

  const updateValues = () => {
    const userInfo = auth().currentUser
    setUserInfo(userInfo)
  }

  const handleLogout = async () => {
    const status = await logoutUser();
    if (status) {
      setIsAuthenticated(false);
      setPetInfo({name: "", age: ""})
    }
  };


  const handleProfileEdit = (currentValue, type, isPet) => {
    setEditedValue({value: "", label : type, isPet})
    onOpen()
  }

  const handleValueEdited = (editedValue) => {
    if(!editedValue.isPet){
        if(editedValue.label === "password"){
            auth().signInWithEmailAndPassword(currentCreds.email, currentCreds.password).then(user =>
                { 
                    if(user){
                        user.user.updatePassword(editedValue.value).then(res => updateValues())
                    }
                }
                )
            }else if(editedValue.label === "name"){
        auth().currentUser.updateProfile({displayName : editedValue.value}).then(res => {
            updateValues()
        })
        
    }else if(editedValue.label === "email"){
        auth().signInWithEmailAndPassword(currentCreds.email, currentCreds.password).then(user =>
            { 
             if(user){
                 user.user.updateEmail(editedValue.value).then(res => updateValues())
                }
         }
         )
        }
    }else{
        const payload = {...petInfo, [editedValue.label] : editedValue.value}
        addPetDetailsFirebase(userInfo.uid, payload, setPetInfo)
    }
    onClose()
  }

  return (
    <Box background={colors.background} flex={'1'} paddingX={3} safeArea>
      <Flex justifyContent={'space-between'} height={'95%'}>
        <VStack marginTop={'6'}>
            <Heading mt="4" ml="1" fontSize="22" color={colors.headeline}>User Details:</Heading>
          <Flex
            flexDirection={'row'}
            // borderTopWidth="1"
            borderBottomWidth="1"
            alignItems="center"
            justifyContent={'space-between'}
            borderColor={'gray.600'}>
            <Stack>  
            <Text paddingTop={'4'} color={'gray.300'} fontWeight="800" marginLeft="2">
              Name:
            </Text>
            <Text paddingTop={"2"} paddingBottom={'4'} color={'gray.300'} marginLeft="2">
              {userInfo.displayName}
            </Text>
            </Stack>
            <TouchableOpacity onPress= {() => handleProfileEdit(userInfo.displayName, "name", false )}>
                <Text
                  paddingTop={'10'}
                  color={colors.primary}
                  marginRight="2">
                  Edit
                </Text>
            </TouchableOpacity>
          </Flex>

          <Flex
            flexDirection={'row'}
            borderTopWidth="1"
            borderBottomWidth="1"
            alignItems="center"
            justifyContent={'space-between'}
            borderColor={'gray.600'}>
            <Stack>  
            <Text paddingTop={'4'} color={'gray.300'} fontWeight="800" marginLeft="2">
              Email:
            </Text>
            <Text paddingTop={"2"} paddingBottom={'4'} color={'gray.400'} marginLeft="2">
              {userInfo.email}
            </Text>
            </Stack>
            <TouchableOpacity onPress= {() => handleProfileEdit(userInfo.email, "email" , false)}>
                <Text
                  paddingTop={'10'}
                  color={colors.primary}
                  marginRight="2">
                  Edit
                </Text>
            </TouchableOpacity>
          </Flex>

          <Flex
            flexDirection={'row'}
            borderTopWidth="1"
            borderBottomWidth="1"
            alignItems="center"
            justifyContent={'space-between'}
            borderColor={'gray.600'}>
            <Stack>  
            <Text paddingTop={'4'} color={'gray.300'} fontWeight="800" marginLeft="2">
              Password:
            </Text>
            <Text paddingTop={"2"} paddingBottom={'4'} color={'gray.400'} marginLeft="2">
              *************
            </Text>
            </Stack>
            <TouchableOpacity onPress= {() => handleProfileEdit("********", "password" , false)}>
                <Text
                  paddingTop={'10'}
                  color={colors.primary}
                  marginRight="2">
                  Edit
                </Text>
            </TouchableOpacity>
          </Flex>

{/* --------------------------------------------------------------------------------------------------- */}
          <Heading mt="4" ml="1" fontSize="22" color={colors.headeline}>Pet Details:</Heading>

          <Flex
            flexDirection={'row'}
            // borderTopWidth="1"
            borderBottomWidth="1"
            alignItems="center"
            justifyContent={'space-between'}
            borderColor={'gray.600'}>
            <Stack>  
            <Text paddingTop={'4'} color={'gray.300'} fontWeight="800" marginLeft="2">
              Pet Name:
            </Text>
            <Text paddingTop={"2"} paddingBottom={'4'} color={'gray.300'} marginLeft="2">
              {petInfo.name}
            </Text>
            </Stack>
            <TouchableOpacity onPress= {() => handleProfileEdit(petInfo.name, "name", true )}>
                <Text
                  paddingTop={'10'}
                  color={colors.primary}
                  marginRight="2">
                  Edit
                </Text>
            </TouchableOpacity>
          </Flex>

          <Flex
            flexDirection={'row'}
            borderTopWidth="1"
            borderBottomWidth="1"
            alignItems="center"
            justifyContent={'space-between'}
            borderColor={'gray.600'}>
            <Stack>  
            <Text paddingTop={'4'} color={'gray.300'} fontWeight="800" marginLeft="2">
              Pet Age:
            </Text>
            <Text paddingTop={"2"} paddingBottom={'4'} color={'gray.400'} marginLeft="2">
              {petInfo.age}
            </Text>
            </Stack>
            <TouchableOpacity onPress= {() => handleProfileEdit(petInfo.age, "age", true )}>
                <Text
                  paddingTop={'10'}
                  color={colors.primary}
                  marginRight="2">
                  Edit
                </Text>
            </TouchableOpacity>
          </Flex>


        </VStack>
        <Button onPress={handleLogout} backgroundColor={colors.primary}>
          Logout
        </Button>
            </Flex>
    

      <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content bottom={bottomInset}  backgroundColor={colors.background}>
          <Box w="100%" px={4} justifyContent="center">
            <Text fontSize="16" color="gray.500">
              Edit {editedValue.label}
            </Text>

            { ['email', 'password'].includes(editedValue.label) && <Stack>
            <Input 
            value = {currentCreds.email}
            onChangeText = {(email) => setCurrentCreds({...currentCreds, email })} 
            borderWidth="1"
            fontSize="16"
            borderColor={"gray.500"}
            background={colors.background}
            placeholder="Your current email"
            color={colors.text}
            mt="4"
            />
            <Input 
            type='password'
            value = {currentCreds.password}
            onChangeText = {(password) => setCurrentCreds({...currentCreds, password })} 
            borderWidth="1"
            fontSize="16"
            borderColor={"gray.500"}
            background={colors.background}
            placeholder="Your current password"
            color={colors.text}
            mt="4"
            />
            </Stack>}

            <Input 
            value = {editedValue.value}
            onChangeText = {(value) => setEditedValue({...editedValue, value })} 
            borderWidth="1"
            fontSize="16"
            borderColor={"gray.500"}
            background={colors.background}
            placeholder={`New ${editedValue.label}`}
            color={colors.text}
            mt="4"
            />
          </Box>
          <Button onPress = {() => handleValueEdited(editedValue)} w="92%" my="5" backgroundColor={colors.primary} >Submit</Button>
        </Actionsheet.Content>
      </Actionsheet>
   
    </Box>
  );
};
export default SettingsScreen;
