import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text , TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import HotelService from '../services/HotelService';
import { CreditCardInput } from 'react-native-credit-card-input';
import { firebase, db } from '../config';
import { useNavigation } from '@react-navigation/native';

export default function Payment() {
    const route = useRoute();
    const [paymentInfo, setPaymentInfo] = useState({});
    const {hotel, totalPrice, rooms, days, checkInDate, checkOutDate} = route.params;
    const navigation = useNavigation();
    const handleCardChange = (formData) => {
        setPaymentInfo(formData);
    };

    const handleBookPress = () => {
        if(paymentInfo.valid){
            const hotelService = new HotelService();
            const user = firebase.auth().currentUser;
            const userId = user.uid;
            hotelService.CreateReservation({ hotel: hotel, paymentInfo: paymentInfo, userId: userId, totalPrice: totalPrice, rooms: rooms, days:days, checkInDate: checkInDate, checkOutDate: checkOutDate},  () => {
                navigation.navigate("Invoince", {hotel: hotel, paymentInfo: paymentInfo, userId: userId, totalPrice: totalPrice, rooms: rooms, days:days, checkInDate: checkInDate, checkOutDate: checkOutDate});
            }, (err) => {
                console.log(err);
            });
        }
        else{
            alert('Invalid Card');
            return;
        }
    };
    return (
        <View style={styles.container}>
        <CreditCardInput
            autoFocus
            requiresName
            requiresCVC
            allowScroll
            requiresPostalCode = {false}
            labelStyle={styles.labelStyle}
            inputStyle={styles.inputStyle}
            validColor={'green'}
            invalidColor={'red'}
            placeholderColor={'darkgray'}
            onChange={handleCardChange}
        />
        <View style={styles.paymentContainer}>
            <Text style={styles.paymentText}>Hotel Price: {hotel.price}$</Text>
            <Text style={styles.paymentText}>Days: {days}</Text>
            <Text style={styles.paymentText}>Rooms: {rooms}</Text>
            <Text style={styles.paymentText}>Total Price: {totalPrice}$</Text>
            <TouchableOpacity
                style={styles.paymentButton}
                onPress={handleBookPress}
            >
                <Text style={{ ...styles.paymentText, color: 'white' }}>Book</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  labelStyle: {
    color: 'black',
    fontSize: 12,
  },
  inputStyle: {
    fontSize: 16,
  },
  paymentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  },
  paymentText: {
    fontSize: 25,
  },
  paymentButton: {
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10,
    backgroundColor: 'green',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
