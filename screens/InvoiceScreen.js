import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function InvoiceScreen() {
  const route = useRoute();
  const { hotel, totalPrice, rooms, days, checkInDate, checkOutDate } = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Images/green-thick.png')} style={styles.checkIcon} />
      </View>
      <Text style={styles.title}>Reservation Created</Text>
      <View style={styles.details}>
        <Text style={styles.detail}>Hotel Name: {hotel.name}</Text>
        <Text style={styles.detail}>Hotel Description: {hotel.description}</Text>
        <Text style={styles.detail}>Hotel Location: {hotel.location}</Text>
        <Text style={styles.detail}>Check-In Date: {checkInDate}</Text>
        <Text style={styles.detail}>Check-Out Date: {checkOutDate}</Text>
        <Text style={styles.detail}>Hotel Price: {hotel.price}$</Text>
        <Text style={styles.detail}>Days: {days}</Text>
        <Text style={styles.detail}>Rooms: {rooms}</Text>
        <Text style={styles.detail}>Total Price: {totalPrice}$</Text>
      </View>

      <TouchableOpacity
        style={styles.goHomeButton}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Text style={styles.goHomeText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  checkIcon: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  details: {
    marginTop: 50,
  },
  detail: {
    fontSize: 20,
  },
  goHomeButton: {
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 15,
    borderColor: 'green',
    backgroundColor: 'green',
    width: 100,
    height: 40
  },
  goHomeText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 17
  }
});
