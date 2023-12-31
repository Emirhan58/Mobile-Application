import React, { useState, useEffect } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    TouchableHighlight,
    StatusBar,
    Image
} from 'react-native';

import { Divider, Button } from '@rneui/base';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Global from './Global';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function HotelScreen() {
    const route = useRoute();
    const { hotel } = route.params;
    const navigation = useNavigation();

    function handleBook(){
        navigation.navigate('Check', {hotel: hotel});
    }
  return (
    <>
            <StatusBar backgroundColor={Global.primary} />
            {
                hotel ? (
                    <ScrollView nestedScrollEnabled={true}>
                        <View style={styles.container} >
                            <View style={{ alignItems: "center" }} >
                            <Image
                                resizeMode={'cover'}
                                style={styles.imageStyle}
                                source={require('../assets/Images/hotel.jpg')}
                            />

                                <TouchableHighlight
                                    style={{ position: 'absolute', width: '100%', top: 7, left: 12 }}
                                    underlayColor={'transparent'}
                                    onPress={() => { navigation.pop() }}
                                >
                                    <View style={{ backgroundColor: 'rgba(0,0,0,.35)',  width:35, height:35, padding: 5, borderRadius: 30 }}>
                                        <MaterialCommunityIcons 
                                            name={"arrow-left"} 
                                            color={"#FFF"}
                                            size={25}
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            
                            <View style={{ padding: 10, width: '100%', maxWidth: 470, paddingHorizontal: 20, backgroundColor: 'white' }} >
                                <Text style={{fontSize: 22, maxWidth: 265, fontWeight: '700', paddingHorizontal: 2, color: Global.black}}
                                    numberOfLines={2}   
                                >
                                    {hotel.name}
                                </Text>
                                <Divider 
                                    orientation="horizontal"
                                    style={{marginBottom: 0}}
                                />
                                <Divider 
                                    orientation="horizontal"
                                    style={{marginBottom: 15}}
                                />
                                <View style={{ padding: 5 }}>
                                    <Text style={{color: "#666", fontSize: 15, marginBottom: 10}}>
                                        HOTEL DESCRIPTION
                                    </Text>
                                    <Text style={{color: '#333', fontSize: 15}}>
                                        { hotel.description }
                                    </Text>
                                </View>
                                <Divider 
                                    orientation="horizontal"
                                    style={{marginVertical: 15}}
                                />
                                <View style={{ padding: 5 }}>
                                    <Text style={{color: "#666", fontSize: 15, marginBottom: 10}}>
                                        SERVICES
                                    </Text>
                                    <View style={styles.servicesContainer} >
                                        <Text>{hotel.services}</Text>
                                    </View>
                                </View> 
                                <Divider 
                                    orientation="horizontal"
                                    style={{marginVertical: 15}}
                                />
                                <View style={{ padding: 5 }}>
                                    <Text style={{color: "#666", fontSize: 15, marginBottom: 8}}>
                                        LOCATION
                                    </Text>
                                    <Text style={{color: "#888", fontSize: 13, marginBottom: 8}} >
                                        { hotel.location }
                                    </Text>
                                </View>
                                <Divider 
                                    orientation="horizontal"
                                    style={{marginVertical: 15}}
                                />
                                <View style={{ padding: 5 }}>
                                    <Text style={{color: "#666", fontSize: 15, marginBottom: 10}}>
                                        PRICE
                                    </Text>
                                    <View style={styles.servicesContainer} >
                                        <Text>{hotel.price}$</Text>
                                    </View>
                                </View> 
                                
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, marginBottom: 5}} >
                                    <Button 
                                        title='Book Now'
                                        buttonStyle={{
                                            width: 175,
                                            height: 45,
                                            backgroundColor: Global.secondary,
                                            borderRadius: 50,
                                            flexDirection: 'row-reverse',
                                            justifyContent: 'space-evenly',
                                            alignItems: 'center'
                                        }}
                                        titleStyle={{
                                            fontSize: 15
                                        }}
                                        onPress={handleBook}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{
                        flexGrow: 1,
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0)',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Flow size={40} color={"#c3c3c3"} />
                    </View>
                )
            }
        </>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    imageStyle: {
        height: 270
    },
    starscontainer: {
        flexDirection: 'row',
        position: 'absolute',
        top: 17,
        right: 10
    },
    servicesContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 3,
        flexWrap: 'wrap'
    },
    priceContainer: {
        position: 'absolute',
        bottom: 16,
        right: 10,
        alignItems: 'flex-end'
    },
    priceHeader: {
        color: '#999',
        fontSize: 12,
        alignSelf: 'flex-end',
        textAlign: 'right',
        width: 80,
    },
    price: {
        fontSize: 23,
        color: '#2a7800',
        fontWeight: '700'
    }
});