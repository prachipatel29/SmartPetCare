import {Box, Text, Flex, Heading} from 'native-base';
import {StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {colors} from '../../apptheme';
import LoginForm from '../components/login/loginForm';

const Login = ({navigation}) => {
  return (
    <Box background={colors.background} flex={'1'} paddingX={5} safeArea>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Box marginTop={'50%'}>
        <Heading letterSpacing={2} size={'xl'} color={colors.text}>
          Log In
        </Heading>
        <LoginForm navigation={navigation} />
      </Box>
    </Box>
  );
};
export default Login;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
