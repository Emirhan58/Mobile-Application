import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { firebase } from './config';

import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user || (user && !user.emailVerified)){
    return (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
  }
  return (
    <Drawer.Navigator initialRouteName="Home">
  <Drawer.Screen
    name="Home"
    component={HomeScreen}
    options={{
      drawerIcon: ({ focused, color, size }) => (
        <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
      ),
    }}
  />
  <Drawer.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      drawerIcon: ({ focused, color, size }) => (
        <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
      ),
    }}
  />
</Drawer.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}