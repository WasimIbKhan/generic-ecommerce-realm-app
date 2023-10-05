import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import AuthScreen from '../screens/user/AuthScreen'; // Adjust path as needed
import StartupScreen from '../screens/StartupScreen';
import { RootState } from '../App';

const AppNavigator: React.FC = () => {
  const isAuth = useSelector((state: RootState)=> !!state.auth.token);
  const didTryAutoLogin = useSelector((state: RootState) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthScreen />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppNavigator;
