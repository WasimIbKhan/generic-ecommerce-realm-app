import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text>Welcome to the Landing Page!</Text>
      <Button title="Logout" onPress={() => navigation.navigate('Auth')} />
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
