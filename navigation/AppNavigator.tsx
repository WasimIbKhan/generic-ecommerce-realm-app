import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootState } from '../App'; // Adjust path as needed
import LandingPage from '../screens/LandingPage'; // Adjust path as needed
import AuthScreen from '../screens/user/AuthScreen'; // Adjust path as needed
import StartupScreen from '../screens/StartupScreen'; // Adjust path as needed

const AppNavigator: React.FC = () => {
  const isAuth = useSelector((state: RootState) => !!state.auth.token);
  const didTryAutoLogin = useSelector((state: RootState) => state.auth.didTryAutoLogin);
  
  return (
    <NavigationContainer independent={true}>
      {isAuth && <LandingPage />}
      {!isAuth && didTryAutoLogin && <AuthScreen />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
