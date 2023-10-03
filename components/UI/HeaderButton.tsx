// HeaderButton.tsx
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton, HeaderButtonProps } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
interface CustomHeaderButtonProps extends HeaderButtonProps {
    // Your custom props here if you have any
  }
  
  const CustomHeaderButton: React.FC<CustomHeaderButtonProps> = (props) => {
    return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
