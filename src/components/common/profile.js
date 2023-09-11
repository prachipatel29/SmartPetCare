import React from 'react';
import {Box, Flex, Heading, Text} from 'native-base';
import { TouchableOpacity } from "react-native";
import {colors} from '../../../apptheme';

const Profile = ({email, navigation}) => {
  
  return (
    <TouchableOpacity onPress = {() => navigation.navigate('Settings')}>
    <Flex
      justifyContent={'center'}
      alignItems="center"
      background={colors.text}
      width={12}
      borderRadius="999"
      height={12}>
      <Heading margin={0} padding={0} size="xl" color={colors.primary}>
        {email ? email.slice(0, 1) : ''}
      </Heading>
    </Flex>
    </TouchableOpacity>
  );
};
export default Profile;
