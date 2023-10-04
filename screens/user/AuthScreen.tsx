import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Alert, Text, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import Input from '../../components/UI/Input';
import AuthBtn1 from '../../components/UI/AuthButton1';
import AuthBtn2 from '../../components/UI/AuthButton2';
import Loading from '../../components/UI/Loading';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';
import * as authActions from '../../store/actions/auth';
import { AppDispatch } from '../../App';
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

interface InputValues {
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  password: string;
}

interface InputValidities {
  [key: string]: boolean | undefined;  // Permit 'undefined' in the values
}

interface FormState {
  inputValues: InputValues;
  inputValidities: InputValidities;
  formIsValid: boolean;
}

interface FormAction {
  type: string;
  value?: string;
  isValid?: boolean;
  input?: string;
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input!]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input!]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && (updatedValidities[key] || false);
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};


interface AuthScreenProps {
  navigation: any; 
}

const AuthScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const dispatch = useDispatch<AppDispatch>()
  const navigation = useNavigation()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      name: '',
      phoneNumber: '',
      address: '',
      password: ''
    },
    inputValidities: {
      email: false,
      name: false,
      phoneNumber: false,
      address: false,
      password: false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (isSignup) {
        await dispatch(authActions.signup(
          formState.inputValues.email,
          formState.inputValues.name,
          formState.inputValues.phoneNumber,
          formState.inputValues.address,
          formState.inputValues.password
        ));
      } else {
        await dispatch(authActions.login(
          formState.inputValues.email,
          formState.inputValues.password
        ));
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);  // Log the local err.message not the state error
    }
    setIsLoading(false);
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  let signUpInputName
  let signUpNumber
  let address
  if(isSignup) {
    signUpInputName = <Input
    id="name"
    label="Name"
    keyboardType="default"
    autoCorrect={false}
    onInputChange={inputChangeHandler}
    initialValue=""
  />
  signUpNumber = <Input
    id="phoneNumber"
    label="Phone Number"
    keyboardType="number-pad"
    required
    onInputChange={inputChangeHandler}
    initialValue=""
  />
  address = <Input
    id="address"
    label="Address"
    keyboardType="default"
    required
    onInputChange={inputChangeHandler}
    initialValue=""
  />
  }
  if(isLoading) {
    return(<Loading />)
  }
  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <ScrollView>
        <Text style={styles.title}>e-commerce</Text>
        <Input
          id="email"
          label="E-Mail"
          keyboardType="email-address"
          autoCorrect={false}
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={inputChangeHandler}
          initialValue=""
          style = {{ marginTop: Dimensions.get("window").height * 0.01 }}
          />
          {signUpInputName}
          {signUpNumber}
          {address}
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
             <View style={styles.buttonContainer}>
            {isSignup ? (
                <AuthBtn1 title={isSignup ? 'Sign Up' : 'Login'} onPress={authHandler} style={isSignup ? isSelected? {color: 'black', borderColor: Colors.primary}: {color: Colors.primary, borderColor: Colors.primary}:  {color: Colors.primary, borderColor: Colors.primary}}/>
              ) : (
                <AuthBtn1 title={isSignup ? 'Sign Up' : 'Login'} onPress={authHandler} style={isSignup ? isSelected? {color: 'black', borderColor: Colors.primary}: {color: Colors.primary, borderColor: Colors.primary}:  {color: Colors.primary, borderColor: Colors.primary}}/>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <AuthBtn2 title={`${isSignup ? 'Login' : 'Sign Up'}`} onPress={() => { setIsSignup(prevState => !prevState)}}/>
            </View>
          </ScrollView>
            <View style={styles.bottomPosition}>
              <AuthBtn2 title={'Forgot your password?'} onPress={() => {}}/>
            </View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    fontFamily: 'lato.thin',
    fontSize: 54,
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.1,
    color: Colors.primary
    },
  checkboxContainer: {
    flexDirection: 'row',
    margin: Dimensions.get('window').width * 0.025
  },
  container: {
    //marginLeft: Dimensions.get('window').width * 0.05,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    marginTop: Dimensions.get('window').height * 0.02
  },
  bottomPosition: {
    marginBottom: Dimensions.get('window').height * 0.05
  }
});

export default AuthScreen;

