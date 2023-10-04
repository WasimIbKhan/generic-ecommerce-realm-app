import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as authActions from '../store/actions/auth';
import { AppDispatch } from '../App';
import { useDispatch } from 'react-redux';
const LandingPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.screen}>
      <Text>Welcome to the Landing Page!</Text>
      <Button title="Logout" onPress={() => dispatch(authActions.logout())} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingPage;
