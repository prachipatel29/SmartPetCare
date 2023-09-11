import {Flex, Text} from 'native-base';
import React from 'react';
import HighlightIcon from './highlightIcon';
import {colors} from '../../../apptheme';

const Header = ({label, children}) => {
  return (
    <Flex flexDirection={'row'} alignItems="center">
      <HighlightIcon bgColor={colors.primary}>{children}</HighlightIcon>
      <Text
        color={colors.text}
        marginLeft="2"
        fontWeight={700}
        letterSpacing="1">
        {label}
      </Text>
    </Flex>
  );
};
export default Header;
