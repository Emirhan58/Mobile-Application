import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

export default function CheckScreen() {
  const route = useRoute();
  const { hotel } = route.params;

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedCheckInDate, setSelectedCheckInDate] = useState(null);
  const [selectedCheckOutDate, setSelectedCheckOutDate] = useState(null);
  const [isCheckInMode, setCheckInMode] = useState(true);
  const [rooms, setRooms] = useState(0);
  const [days, setDays] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
      if (selectedCheckInDate && selectedCheckOutDate) {
        const checkInDate = new Date(selectedCheckInDate);
        const checkOutDate = new Date(selectedCheckOutDate);
    
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setDays(daysDifference);
      }
      else if (!selectedCheckInDate && !selectedCheckOutDate){
        setSelectedCheckInDate(null);
        setSelectedCheckOutDate(null);
        setCheckInMode(true);
        setRooms(0);
        setDays(0);
      }
    }, [hotel,selectedCheckInDate, selectedCheckOutDate]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDatePress = (day) => {
    if (isCheckInMode) {
      setSelectedCheckInDate(day.dateString);
      setCheckInMode(false); // Switch to check-out mode after selecting check-in date
    } else {
      if (selectedCheckInDate && day.dateString < selectedCheckInDate) {
        // Check-out date cannot be before the check-in date
        alert('Check-out date cannot be before the check-in date');
        setSelectedCheckInDate(null);
        setSelectedCheckOutDate(null);
        setCheckInMode(true); // Switch back to check-in mode
      } else {
        setSelectedCheckOutDate(day.dateString);
        const checkInDate = new Date(selectedCheckInDate);
        const checkOutDate = new Date(selectedCheckOutDate);
        const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        setDays(daysDifference);
      }
    }
  };

  const handleResetDates = () => {
    setSelectedCheckInDate(null);
    setSelectedCheckOutDate(null);
    setCheckInMode(true); // Switch back to check-in mode
  };

  const handleBookPress = () => {
    if(!selectedCheckInDate || !selectedCheckOutDate){
      alert('Please select date');
      return;
    }
    const totalPrice = hotel.price * days * rooms;
    if(totalPrice === 0){
      alert('Please enter room');
      return;
    }
    navigation.navigate("Payment", {hotel: hotel, totalPrice: totalPrice, rooms:rooms, days:days, checkInDate: selectedCheckInDate, checkOutDate: selectedCheckOutDate});
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>{hotel.name}</Text>

      <View style={styles.header}>
        <Text style={styles.inputText}>Select Date: </Text>
        <TouchableOpacity onPress={toggleModal} style={styles.calendarButton}>
          <Text style={styles.showCalendarText}>Show Calendar</Text>
        </TouchableOpacity>
        
      {/* <Text>{selectedCheckInDate ? `Check-In Date: ${selectedCheckInDate}` : 'No date selected'}</Text>
      <Text>{selectedCheckOutDate ? `Check-Out Date: ${selectedCheckOutDate}` : 'No date selected'}</Text> */}
      </View>

      <View style={styles.header}>
        <Text style={styles.inputText}>Rooms: </Text>
        <TextInput
          style={styles.input}
          value={rooms.toString()}
          keyboardType="numeric"
          onChangeText={(text) => {
            const numericValue = parseInt(text);
            if (!isNaN(numericValue)) {
              setRooms(numericValue);
            }
            else{
              setRooms(0);
            }
          }}
        />
      </View>

      <Text style={styles.inputText}>Hotel price: {hotel.price}$</Text>
      <Text style={styles.inputText}>Total days: {days}</Text>
      <Text style={styles.inputText}>Total price: {hotel.price * rooms * days}$</Text>

      <TouchableOpacity
        style = {styles.bookButton}
        onPress = {handleBookPress}
      >
        <Text style={styles.bookText}>Book</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <Text>{isCheckInMode ? 'Select Check-In Date' : 'Select Check-Out Date'}</Text>
          <Calendar
            onDayPress={handleDatePress}
            markedDates={{
              [selectedCheckInDate]: { selected: true, marked: true, selectedColor: 'green' },
              [selectedCheckOutDate]: { selected: true, marked: true, selectedColor: 'blue' },
            }}
          />

          <Button title="Reset Dates" onPress={handleResetDates} />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 25,
    color: 'black',
    marginBottom: 40
  },
  calendarButton: {
    width: 110,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'green',
  },
  showCalendarText: {
    color: 'white',
  },
  inputText: {
    fontSize : 20
  },
  input: {
    borderWidth: 2,
    borderRadius: 15,
    width: 150,
    borderColor: 'black',
    paddingTop: 2,
    paddingLeft: 5,
    fontSize: 20
  },
  bookButton: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'green',
    backgroundColor: 'green',
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookText: {
    fontSize: 25,
    color: 'white',

  }
});
