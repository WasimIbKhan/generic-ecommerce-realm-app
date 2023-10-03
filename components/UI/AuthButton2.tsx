import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

// Define the props expected by AuthBtn
interface AuthBtnProps {
  onPress: () => void;
  title: string;
}

const AuthBtn: React.FC<AuthBtnProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: Colors.primary,
    alignSelf: 'center',
    fontSize: 14,
  },
});

export default AuthBtn;
