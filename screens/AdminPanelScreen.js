import { StyleSheet, Text, View, TextInput ,KeyboardAvoidingView , ScrollView, Image, Button } from 'react-native';
import React, { useState } from 'react';
import Global from './Global';
import HotelService from '../services/HotelService';
import { Flow } from 'react-native-animated-spinkit';

export default function AdminPanelScreen() {
    
    const [ loading, setLoading ] = useState(false);
    const [ hotelName, setHotelName ] = useState('');
    const [ hotelDescription, setHotelDescription ] = useState('');
    const [ services, setServices ] = useState('');
    const [ prize, setPrize ] = useState('');
    
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
            case "prize":
                setPrize(value);
                break;
            default:
                break;
        }
    }

    function handleSubmit(){
        if(hotelName === '' || hotelDescription === '' || services === '' || prize === ''){
            alert('Please fill all inputs');
            return;
        }
        setLoading(true);
        const hotelService = new HotelService();
        hotelService.AddHotel({ hotelName , hotelDescription, services, prize },  () => {
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
                Add Hotel
            </Text>

            <View style={{ flex: 1, alignItems: 'center', width: '95%', maxWidth: 425 }}>
                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Hotel Name"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("hotelName", value);
                        }}
                        />
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Hotel Description"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("hotelDescription", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Services"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("services", value);
                        }}/>
                </View>

                <View style={styles.inputcontainer}>
                    <TextInput placeholder={"Prize"}
                        style={styles.input}
                        placeholderTextColor={"#CCC"}
                        onChangeText={(value) => {
                            handleChange("prize", value);
                        }}/>
                </View>

                <View style={{ flex: 1, width: '95%', maxWidth: 425 }}>
            
            <View style={{alignItems: 'center', marginTop: 15, width: '100%'}}>
                <Button 
                    title='Add Hotel'
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