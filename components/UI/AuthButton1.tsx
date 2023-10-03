import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StyleProp, ViewStyle } from 'react-native';
import Colors from '../../constants/Colors';

interface AuthBtnProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  title: string;
}

const AuthBtn: React.FC<AuthBtnProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{...styles.button, ...props.style as ViewStyle}}>
        <Text style={{...styles.buttonText, ...props.style as ViewStyle}}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderColor: Colors.primary,
    borderWidth: 1,
    paddingVertical: Dimensions.get('window').height * 0.015,
    paddingHorizontal: '3%',
    marginHorizontal: Dimensions.get('window').width * 0.15,
    borderRadius: Dimensions.get('window').width * 0.1
  },
  buttonText: {
    fontWeight: '800',
    alignSelf: 'center',
    fontSize: 18
  }
});

export default AuthBtn;
