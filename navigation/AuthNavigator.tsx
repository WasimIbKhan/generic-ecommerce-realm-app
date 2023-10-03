import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/user/AuthScreen'; // Adjust path as needed

export type AuthStackParamList = {
  Auth: undefined;
};

const AuthStackNavigator = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <AuthStackNavigator.Navigator>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={{headerShown: false}}
      />
    </AuthStackNavigator.Navigator>
  );
};
