import React, { useState, useEffect} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import Global from './Global';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { firebase, db } from '../config';
import HotelService from '../services/HotelService';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';


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



const HotelItem = ({hotel, userData, onEdit, onDelete, navigation }) => {
  return (
    <View>
      <TouchableHighlight underlayColor={'transparent'}
        onPress={() => {
          navigation.navigate('Hotel', {hotel: hotel});
        }}
      >
        <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode={'cover'}
            style={styles.imageStyle}
            source={require('../assets/Images/hotel.jpg')}
          />
        </View>

          <View style={{ padding: 5, flexGrow: 1 }}>
            <Text style={{ fontSize: 19, fontWeight: '700', maxWidth: '75%', paddingHorizontal: 2, color: Global.black }}>
              {hotel.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="map-marker" color={Global.black} size={12} style={{ padding: 0 }} />
              <Text style={{ color: Global.black, fontSize: 13 }}>
                {hotel.location}
              </Text>
            </View>

            <Text style={styles.servicesContainer} numberOfLines={3} >
              {hotel.services}
            </Text>
            <View style={styles.priceContainer} >
              <Text style={styles.priceHeader}>
                Starting price per night
              </Text>
              <Text style={styles.price} >
                {hotel.price + '$'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>

      {userData.isAdmin && (
        <View style={styles.adminButtonsContainer}>
          <TouchableOpacity style={styles.adminButton} onPress={() => onEdit(hotel)}>
            <MaterialCommunityIcons name="pencil" color={Global.black} size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButton} onPress={() => onDelete(hotel)}>
            <MaterialCommunityIcons name="delete" color={Global.black} size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default function HomeScreen() {
  const [looking, setLooking] = useState(true);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  function onEdit(hotel){
      navigation.navigate('EditHotel', {hotel: hotel});
  }
  
  function onDelete(hotel){
    const hotelService = new HotelService();
    hotelService.DeleteHotel( hotel ,  () => {
      alert('Hotel Deleted');
      fetchData();
    }, (err) => {
        alert(`${err}`);
    });
  }

  const fetchData = async () => {
    try {
      const collectionRef = firebase.firestore().collection('hotels');
      const snapshot = await collectionRef.get();

      const documents = [];
      snapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });

      setData(documents);

      const userDataGet = await getUserInfo(firebase.auth().currentUser);
      setUserData(userDataGet);

      setLooking(false);

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
      };
    }, [])
  );

  return (
    <>
      {looking ? (
        <View>
          <Loading />
        </View>
      ) : ( 
            <View>
              {data.map((hotel) => (
                <HotelItem key={hotel.id} hotel={hotel} userData={userData} onEdit={onEdit} onDelete={onDelete} navigation={navigation} />
              ))}
            </View>
          )
      }
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    maxWidth: 355,
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    elevation: 5,
    backgroundColor: 'white'
  },
  imageContainer: {
    width: '100%',
    height: 130,
  },
  imageStyle: {
    flex: 1,
    width: null,
    height: null,
    borderRadius: 5,
  },
  servicesContainer: {
    flexGrow: 1,
    maxHeight: 80,
    marginTop: 12,
    marginRight: 90,
    padding: 3,
    textAlign: 'justify',
    lineHeight: 25,
  },
  priceContainer: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    alignItems: 'flex-end',
  },
  priceHeader: {
    color: '#999',
    fontSize: 11,
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: 80,
    marginBottom: 10
  },
  price: {
    fontSize: 21,
    color: '#2a7800',
    fontWeight: '700'
  },
  adminButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 30,
    marginTop: 15
  },
  adminButton: {
    marginLeft: 10,
    backgroundColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
});
