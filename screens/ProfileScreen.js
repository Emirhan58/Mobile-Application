import React, { useState, useEffect } from 'react';
import { firebase, db } from '../config';
import { collection, doc, setDoc } from 'firebase/firestore';

import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Loading from './Loading';
const Stack = createNativeStackNavigator();



function ProfileInfo({ navigation, showHeader }) {
  const [looking, setLooking] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [editPage, setEditPage] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const user = firebase.auth().currentUser;

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

  function updateUserInfo(){
    firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          firstName: firstName,
          email: user.email,
          lastName: lastName,
          phoneNumber: phoneNumber
        });
  }

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const fetchData = async () => {
      if (user) {
        try {
          const userData = await getUserInfo(user);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setPhoneNumber(userData.phoneNumber);
          setLooking(false);
        } catch (error) {
          console.error('Error:', error.message);
        }
      } else {
        setLooking(false);
      }
    };

    fetchData();
  }, [refresh]);

  return (
    <>
      {looking ? (
        <View>
          <Loading />
        </View>
      ) : (
        <View style={{ flex: 1, width: '90%', maxWidth: 450, alignSelf: 'center', paddingTop: '10%', justifyContent: 'center'  }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10, position: 'center' }}>
              <Text style={styles.mainTitle}>My Account</Text>
              <View style={styles.singleContainer}>
                  <Text style={styles.miniTitle}>First Name</Text>
                  {!editPage && (
                    <Text style={styles.value}>{firstName}</Text>
                  )}
                  {editPage && (
                    <TextInput style={styles.value}
                    onChangeText={(value) => {
                      setFirstName(value);
                    }}
                  >{firstName}</TextInput>
                  )}
              </View>
              <View style={styles.singleContainer}>
                  <Text style={styles.miniTitle}>Last Name</Text>
                  {!editPage && (
                    <Text style={styles.value}>{lastName}</Text>
                  )}
                  {editPage && (
                    <TextInput style={styles.value}
                    onChangeText={(value) => {
                      setLastName(value);
                    }}
                  >{lastName}</TextInput>
                  )}
              </View>
              <View style={styles.singleContainer}>
                  <Text style={styles.miniTitle}>Email</Text>
                  <Text style={styles.value}>{user.email}</Text>  
              </View>
              <View style={styles.lastSingleContainer}>
                  <Text style={styles.miniTitle}>Phone Number</Text>
                  {!editPage && (
                    <Text style={styles.value}>{phoneNumber}</Text>
                  )}
                  {editPage && (
                    <TextInput style={styles.value}
                      onChangeText={(value) => {
                        setPhoneNumber(value);
                      }}
                    >{phoneNumber}</TextInput>
                  )}
              </View>
          </View>
          <TouchableOpacity style={styles.editButton}
            onPress={() => {
              if(editPage){
                updateUserInfo();
              }
              setEditPage(!editPage);
            }}
          >
            <Text style={{ color: 'white', fontSize: 15 }}>{editPage ? 'save' : 'edit'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

function ProfileScreen({ showHeader, handleSignIn }) {
  return (
    <Stack.Navigator
      initialRouteName="info"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='info'>
        {props => <ProfileInfo {...props} showHeader={showHeader} handleSignIn={handleSignIn} />}
      </Stack.Screen>
      {/* AddCreditCard ekranı burada tanımlanmalı */}
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
    singleContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12
    },
    lastSingleContainer:{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingBottom: 7
    },
    mainTitle :{
        fontSize: 18,
        color: '#222',
        fontWeight: '700',
        marginTop: 5,
        marginBottom: 20
    },
    miniTitle: {
        color: '#333',
        fontSize: 15
    },
    value: {
        color: '#666',
        fontSize: 16
    },
    reminder: {
        textAlign: 'center',
        color: '#777',
        marginBottom: 20
    },
    cardContainer: {
        padding: 15,
        borderRadius: 5,
        borderColor: 'green',
        borderWidth: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    verifieIcon: {
        width: 22,
        height: 22,
        padding: 3,
        borderRadius: 25,
        borderColor: 'green',
        borderWidth: 2,
    },
    content: {
        fontWeight: '700',
        color: '#777',
        margin: 2
    },
    editButton: {
      height: 30,
      marginLeft: "80%",
      borderWidth: 2,
      alignItems: "center",
      borderRadius: 5,
      borderColor: "green",
      backgroundColor: "green",
      marginTop: 15,
      paddingTop: 2
    }
});

export default ProfileScreen;
