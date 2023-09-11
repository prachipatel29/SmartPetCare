import React, {useState} from 'react';
import {Box, Stack, Input, Icon, Button, Text, Image, Flex} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../apptheme';
import {createUser} from '../../utils/user';
import {useStore} from '../../../zustand/store/useStore';

const CreateAccountForm = ({navigation}) => {
  const [name, setName] = useState('');
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const setIsAuthenticated = useStore(prev => prev.setIsAuthenticated);

  const handleCreateAccount = () => {
    if (password === confirmation) {
      createUser(name, email, password).then(res => {
        console.log(res);
        if (res.status) {
          setIsAuthenticated(true);
        }
      });
    }
  };
  return (
    <Stack space={4} w="100%" mt="12">
      <Input
        value={name}
        onChangeText={setName}
        borderColor="gray.500"
        fontSize = "16px"
        background={colors.background}
        placeholder="Your name"
        color={colors.text}
        height={12}
      />

      <Input
        value={email}
        onChangeText={setEmail}
        borderColor="gray.500"
        fontSize = "16px"
        background={colors.background}
        placeholder="Email"
        color={colors.text}
        height={12}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        type={show ? 'text' : 'password'}
        background={colors.background}
        borderColor="gray.500"
        fontSize = "16px"
        height={12}
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
      <Input
        value={confirmation}
        onChangeText={setConfirmation}
        type={show ? 'text' : 'password'}
        background={colors.background}
        borderColor="gray.500"
        fontSize = "16px"
        height={12}
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
        placeholder="Confirm Password"
      />
      <Button
        isLoading={false}
        isLoadingText="Submitting"
        backgroundColor={colors.primary}
        onPress={handleCreateAccount}>
        Create Account
      </Button>

      <Flex flexDirection={'row'} justifyContent="center">
        <Text color={colors.text}>Already have account ? </Text>
        <Text
          color={colors.primary}
          onPress={() => navigation.navigate('login')}>
          Log In
        </Text>
      </Flex>
    </Stack>
  );
};
export default CreateAccountForm;
