import {Box, Stack, Input, Icon, Button, Text, Image, Flex} from 'native-base';
import React, {useState} from 'react';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import {colors} from '../../../apptheme';
import { useStore } from '../../../zustand/store/useStore';

const LoginForm = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const setIsAuthenticated = useStore(state => state.setIsAuthenticated)

  const handleSignIn = () => {
    if(!email.length && !password.length){
      return;
    }

    auth().signInWithEmailAndPassword(email, password).then(user => {
      if(user){
        console.log(user)
        setIsAuthenticated(true)
      }
    })
  }
  return (
    <Stack space={4} w="100%" mt="12">
      <Input
        borderWidth="1"
        borderColor="gray.500"
        fontSize = "16px"
        background={colors.background}
        placeholder="Email"
        color={colors.text}
        height={12}
        onChangeText = {setEmail}
      />
      <Input
        type={show ? 'text' : 'password'}
        background={colors.background}
        borderColor="gray.500"
        fontSize = "16px"
        height={12}
        onChangeText = {setPassword}
        color={colors.text}
        InputRightElement={
          <Box background={colors.background} py="3">
            <Icon
              as={
                <MaterialIcons name={show ? 'visibility' : 'visibility-off'} />
              }
              size={18}
              mr="2"
              color="muted.400"
              onPress={() => setShow(!show)}
            />
          </Box>
        }
        placeholder="Password"
      />
      <Button
        isLoading={false}
        isLoadingText="Submitting"
        backgroundColor={colors.primary}
        onPress = {handleSignIn}
        >
        Log in
      </Button>
      <Text color={colors.text} textAlign="center">
      </Text>
      <Flex flexDirection={'row'} justifyContent="center">
        <Text color={colors.text}>New to PetCare ? </Text>
        <Text
          color={colors.primary}
          onPress={() => navigation.navigate('createAccount')}>
          Create account
        </Text>
      </Flex>
    </Stack>
  );
};
export default LoginForm;
