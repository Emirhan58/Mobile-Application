import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { firebase } from '../config';
import { useFocusEffect } from '@react-navigation/native';

export default function ReservationsScreen() {
  const [userReservations, setUserReservations] = useState([]);
  const user = firebase.auth().currentUser;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
      };
    }, [])
  );

  const fetchData = async () => {
    try {
      const collectionRef = firebase.firestore().collection('reservations');
      const snapshot = await collectionRef.where('userId', '==', user.uid).get();

      const reservations = [];
      snapshot.forEach((doc) => {
        reservations.push({ id: doc.id, ...doc.data() });
      });

      setUserReservations(reservations);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  return (
    
    <ScrollView style={styles.container}>
      {userReservations.length === 0 ? (
        <Text style={styles.noReservationMessage}>No reservations found.</Text>
      ) : ( 
      userReservations.map((reservation) => (
        <View key={reservation.id} style={styles.reservationContainer}>
          <Text style={styles.label}>Hotel Name:</Text>
          <Text style={styles.text}>{reservation.hotelName}</Text>

          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{reservation.location}</Text>

          <Text style={styles.label}>Check-in Date:</Text>
          <Text style={styles.text}>{reservation.checkInDate}</Text>

          <Text style={styles.label}>Check-out Date:</Text>
          <Text style={styles.text}>{reservation.checkOutDate}</Text>

          <Text style={styles.label}>Days:</Text>
          <Text style={styles.text}>{reservation.days}</Text>

          <Text style={styles.label}>Rooms:</Text>
          <Text style={styles.text}>{reservation.rooms}</Text>

          <Text style={styles.label}>Payer:</Text>
          <Text style={styles.text}>{reservation.payer}</Text>

          <Text style={styles.label}>Total Price:</Text>
          <Text style={styles.text}>{reservation.totalPrice}</Text>
        </View>
      )))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reservationContainer: {
    width: '95%',
    maxWidth: 355,
    alignSelf: 'center',
    marginBottom: 25,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'white',
    padding: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 8,
  },
});
