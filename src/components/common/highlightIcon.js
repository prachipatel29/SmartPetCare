import React from 'react';
import {View} from 'react-native';

const HighlightIcon = ({color, bgColor, children}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        padding: 7,
        borderRadius: 999,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </View>
  );
};
export default HighlightIcon;
