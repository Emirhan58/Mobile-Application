import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput ,KeyboardAvoidingView , ScrollView, Image, Button } from 'react-native';
import React, { useState, useEffect} from 'react';
import Global from './Global';
import HotelService from '../services/HotelService';
import { Flow } from 'react-native-animated-spinkit';
import { useFocusEffect } from '@react-navigation/native';

export default function EditHotelScreen() {
    const route = useRoute();
    const { hotel } = route.params;
    const [ loading, setLoading ] = useState(false);
    const [ hotelName, setHotelName ] = useState(hotel.name);
    const [ hotelDescription, setHotelDescription ] = useState(hotel.description);
    const [ services, setServices ] = useState(hotel.services);
    const [ price, setPrice ] = useState(hotel.price);
    const [ location, setLocation ] = useState(hotel.location);
    const [ rooms, setRooms ] = useState('');
    const [ availableRooms, setAvailableRooms ] = useState('');

    useEffect(() => {
        // Update state variables when route.params change
        setHotelName(hotel.name);
        setHotelDescription(hotel.description);
        setServices(hotel.services);
        setPrice(hotel.price);
        setLocation(hotel.location);
    }, [hotel]);

    function handleChange(name, value){
        switch (name){
            case "hotelName":
                setHotelName(value);
                break;
            case "hotelDescription":
                setHotelDescription(value);
                break;
            case "services":
                setServices(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "location":
                setLocation(value);
                break;
            case "rooms":
                setRooms(value);
                break;
            case "availableRooms":
                setAvailableRooms(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(){
        if(hotelName === '' || hotelDescription === '' || services === '' || location === '' || price === ''
        || rooms === '' || availableRooms === ''){
            alert('Please fill all inputs');
            return;
        }
        setLoading(true);
        const hotelService = new HotelService();
        const hotelId = hotel.id;
        hotelService.EditHotel({hotelId ,hotelName , hotelDescription, services, location, price, rooms, availableRooms },  () => {
            alert('Hotel Edited');
            setLoading(false);
        }, (err) => {
            alert(`${err}`);
            setLoading(false);
        });
    }
    return (
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', height: '100%' }}
            style={{ backgroundColor: Global.primary }}
        >
            <>
            <View  style={[styles.container]}>
            <Image 
                style={styles.image}
                source={require('../assets/Images/logo-white.png')}
            />
            <Text style={styles.title} >
                Edit Hotel
            </Text>

            <View style={{ flex: 1, alignItems: 'center', width: '95%', maxWidth: 425 }}>
                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Hotel Name"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        value={hotelName}
                        onChangeText={(value) => {
                            handleChange("hotelName", value);
                        }}
                        />
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Hotel Description"}
                        style={styles.input}
                        value={hotelDescription}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("hotelDescription", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Services"}
                        style={styles.input}
                        value={services}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("services", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Location"}
                        style={styles.input}
                        value={location}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("location", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Price"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        value={price}
                        onChangeText={(value) => {
                            handleChange("price", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Rooms"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("rooms", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Available Rooms"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("availableRooms", value);
                        }}/>
                </View>

                <View style={{ flex: 1, width: '95%', maxWidth: 425 }}>
            
            <View style={{alignItems: 'center', marginTop: 15, width: '100%'}}>
                <Button 
                    title='Edit Hotel'
                    containerStyle={styles.buttonstyle}
                    buttonStyle={styles.buttonstyle}
                    titleStyle={loading ? { display: 'none' } : { fontSize: 14 }}
                    icon={ loading && <Flow size={30} color='white' /> }
                    disabled={loading}
                    iconContainerStyle={!loading ? { display: 'none' } : null}
                    onPress={handleSubmit}
                    disabledStyle={{ backgroundColor: "#899B9A" }}
                />
            </View>
        </View>

            </View>
            
            </View>
            </>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    arrowStyle: {
        paddingLeft: 20,
        paddingTop: 55,
        paddingBottom: '5%'
    },
    container: {
        flexGrow: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 45,
        height: 45,
        alignSelf: 'center',
        marginBottom: 5
    },
    title: {
        alignSelf: 'center',
        fontSize: 25,
        color: 'white',
        marginBottom: 40
    },
    inputcontainer: {
        borderColor: 'transparent',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 10,
        height: 50,
        borderRadius: 50,
        width: 300,
        marginTop: 20,
    },
    input: {
        color: '#CCC',
        marginLeft: 2,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    buttonstyle: {
        width: '100%',
        height: 45,
        borderRadius: 50,
        backgroundColor: Global.buttonbg1,
        position: "absolute"
    },
    erroStyle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#F88',
        marginTop: 0,
        marginBottom: 8,
        marginHorizontal: 30
    }
})