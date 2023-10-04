import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import Colors from '../../constants/Colors';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

interface InputState {
  value: string;
  isValid: boolean;
  touched: boolean;
}

interface Action {
  type: string;
  value?: string;
  isValid?: boolean;
}

interface Props {
  initialValue?: string;
  initiallyValid?: boolean;
  onInputChange: (id: string, value: string, isValid: boolean) => void;
  id: string;
  label: string;
  required?: boolean;
  email?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  style?: StyleProp<TextStyle>;
  errorText?: string;
  [x: string]: any; // for other TextInput props which might not be defined
}

const inputReducer = (state: InputState, action: Action): InputState => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value!,
        isValid: action.isValid!,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<Props> = (props) => {

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid ?? true, // provide a default value
    touched: false
  });  
  
  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id, props.value]); // Include props.value as a dependency

  const textChangeHandler = (text: string) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.inputLabel, ...props.style }}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
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
  label: {
    marginVertical: 8
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
