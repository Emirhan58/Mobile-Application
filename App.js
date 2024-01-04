import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerItemList ,DrawerContentScrollView, DrawerItem  } from '@react-navigation/drawer';
import { firebase } from './config';
import { Entypo } from '@expo/vector-icons'; 
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Ionicons, MaterialIcons  } from '@expo/vector-icons';
import AdminPanelScreen from './screens/AdminPanelScreen';
import HotelScreen from './screens/HotelScreen';
import CheckScreen from './screens/CheckScreen';
import EditHotelScreen from './screens/EditHotelScreen';
import PaymentScreen from './screens/PaymentScreen';
import InvoiceScreen from './screens/InvoiceScreen';
import * as Notifications from "expo-notifications";
import ReservationsScreen from './screens/ReservationsScreen';
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

async function getUserInfo(user){
    try {
      let doc = await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .get();
  
      if (!doc.exists){
        alert('No user data found!')
      } else {
        return doc.data();
      }
    } catch (err){
    alert('There is an error.', err.message)
    }
  }

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState({});

  function onAuthStateChanged(user) {
    setUser(user);
    if(user){
      const fetchData = async () => {
          try {
            const userDataGet = await getUserInfo(user);
            setUserData(userDataGet);

          } catch (error) {
            console.error('Error:', error.message);
          }
      };
      fetchData();
    }
    if (initializing) setInitializing(false);
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
      console.log("permission not granted");
      }
    };

    requestPermissions();

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
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
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
        name="Reservations"
        component={ReservationsScreen}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Entypo name={focused ? 'star' : 'star-outlined'} size={size} color={color} />
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
      {userData.isAdmin && (
        <Drawer.Screen
          name="Admin Panel"
          component={AdminPanelScreen}
          options={{
            drawerIcon: ({ focused, color, size }) => (
              <MaterialIcons name="admin-panel-settings"  size={size} color={color} />
            ),
          }}
        />
      )}

      <Drawer.Screen
        name="Hotel"
        component={HotelScreen}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="EditHotel"
        component={EditHotelScreen}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Check"
        component={CheckScreen}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="Invoice"
        component={InvoiceScreen}
        options={{
          drawerLabel: () => null,
          drawerIcon: () => null,
        }}
      />

    </Drawer.Navigator>
    
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          firebase.auth().signOut();
        }}
        icon={({ focused, color, size }) => (
          <Ionicons name={focused ? 'log-out' : 'log-out-outline'} size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}