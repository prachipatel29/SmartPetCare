import React from 'react';
import {Box, Heading} from 'native-base';
import {StyleSheet, StatusBar} from 'react-native';
import {colors} from '../../apptheme';
import CreateAccountForm from '../components/login/CreateAccountForm';

const CreateAccount = ({navigation}) => {
  return (
    <Box background={colors.background} flex={'1'} paddingX={5} safeArea>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Box marginTop={'50%'}>
        <Heading letterSpacing={2} size={'xl'} color={colors.text}>
          Create Account
        </Heading>
        <CreateAccountForm navigation={navigation} />
      </Box>
    </Box>
  );
};
export default CreateAccount;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
});
