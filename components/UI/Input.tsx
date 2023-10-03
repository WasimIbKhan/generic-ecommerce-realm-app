import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

interface InputProps {
  onInputChange: (id: string, value: string, isValid: boolean) => void;
  id: string;
  label: string;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  errorText?: string; 
  [key: string]: any;
}

const Input: React.FC<InputProps> = (props) => {
  const textChangeHandler = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    props.onInputChange(props.id, text, isValid);
  };

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.inputLabel, ...props.style }}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        onChangeText={textChangeHandler}
      />
      {props.initialValue && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: '100%'
  },
  inputLabel: {
    fontSize: 17,
    marginLeft: '5%'
  },
  input: {
    backgroundColor: '#f5f4f5',
    borderColor: Colors.primary,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    marginHorizontal: '5%',
    marginVertical: '2%',
    borderRadius: 10
  },
  errorContainer: {
    marginVertical: '2%',
    marginHorizontal: '5%'
  },
  errorText: {
    color: 'red',
    fontSize: 13
  }
});

export default Input;
