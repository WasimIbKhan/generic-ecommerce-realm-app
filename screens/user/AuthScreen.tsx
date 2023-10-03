import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Alert,
    Text,
    Dimensions
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { useDispatch } from 'react-redux';
  import Input from '../../components/UI/Input';
  import AuthBtn1 from '../../components/UI/AuthButton1';
  import AuthBtn2 from '../../components/UI/AuthButton2';
  import Loading from '../../components/UI/Loading';
  import Colors from '../../constants/Colors';
  import * as authActions from '../../store/actions/auth';
  import { AppDispatch } from './../../App';
  
  const AuthScreen: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
  
    const dispatch = useDispatch<AppDispatch>();
  
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
          await dispatch(authActions.signup(email, name, phoneNumber, address, password));
        } else {
          await dispatch(authActions.login(email, password));
        }
      } catch (err: any) {
        setError(err.message);
        console.log(error);
      }
      setIsLoading(false);
    };
  
    if (isLoading) {
      return <Loading />;
    }
  
    return (
      <KeyboardAvoidingView style={styles.screen}>
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
            onInputChange={setEmail}
            initialValue=""
            style={{ marginTop: Dimensions.get("window").height * 0.01 }}
            />

          {isSignup && (
            <>
              <Input
                id="name"
                label="Name"
                keyboardType="default"
                autoCorrect={false}
                onInputChange={setName}
                initialValue=""
                />

              <Input
                id="phoneNumber"
                label="Phone Number"
                keyboardType="number-pad"
                required
                onInputChange={setPhoneNumber}
                initialValue=""
              />
              <Input
                id="address"
                label="Address"
                keyboardType="default"
                required
                onInputChange={setAddress}
                initialValue=""
              />
            </>
          )}
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={setPassword}
            initialValue=""
          />
          <View style={styles.buttonContainer}>
            <AuthBtn1
              title={isSignup ? 'Sign Up' : 'Login'}
              onPress={authHandler}
            />
          </View>
          <View style={styles.buttonContainer}>
            <AuthBtn2
              title={`${isSignup ? 'Login' : 'Sign Up'}`}
              onPress={() => { setIsSignup(prevState => !prevState) }}
            />
          </View>
        </ScrollView>
        <View style={styles.bottomPosition}>
          <AuthBtn2 title={'Forgot your password?'} onPress={() => { }} />
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

