import { firebase, db } from '../config';
import { collection, doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default class HotelService{
      
    async AddHotel(object, success, error){

        const hotelName = object["hotelName"];
        const hotelDescription = object["hotelDescription"];
        const services = object["services"];
        const location = object["location"];
        const price = object["price"];
        const rooms = object["rooms"];
        const availableRooms = object["availableRooms"];

        try{
            const hotelsCollectionRef = collection(db, 'hotels');
            await addDoc(hotelsCollectionRef, {
                name: hotelName,
                description: hotelDescription,
                services: services,
                location: location,
                price: price,
                rooms: rooms,
                availableRooms: availableRooms
            }).then(() => {
                return success();
            });

        } catch(e) {
            return error(e);
        }

    }

    async DeleteHotel(hotel, success, error){
        const hotelId = hotel["id"];
        try{
            const collectionRef = firebase.firestore().collection('hotels');
            await collectionRef.doc(hotelId).delete()
            .then(() => {
                return success();
            });
        } catch(e) {
            return error(e);
        }
    }

    

    async EditHotel(hotel, success, error){
        const hotelId = hotel["hotelId"];
        const name = hotel["hotelName"];
        const description = hotel["hotelDescription"];
        const services = hotel["services"];
        const location = hotel["location"];
        const price = hotel["price"];
        const rooms = hotel["rooms"];
        const availableRooms = hotel["availableRooms"];

        try{
            firebase.firestore()
            .collection('hotels')
            .doc(hotelId)
            .set({
                name: name,
                description: description,
                services: services,
                location: location,
                price: price,
                rooms: rooms,
                availableRooms: availableRooms
            }).then(() => {
                return success();
            })
        } catch(e) {
            return error(e);
        }
    }
    async CreateReservation(object, success, error) {
        const hotel = object["hotel"];
        const paymentInfo = object["paymentInfo"];
        const userId = object["userId"];
        const rooms = object["rooms"];
        const days = object["days"];
        const checkInDate = object["checkInDate"];
        const checkOutDate = object["checkOutDate"];
        const totalPrice = object["totalPrice"];
    
        try {
            const reservationsCollectionRef = collection(db, 'reservations');
    
            const reservationDocRef = await addDoc(reservationsCollectionRef, {
                userId: userId,
                hotelName: hotel.name,
                payer: paymentInfo["values"].name,
                location: hotel.location,
                days: days,
                rooms: rooms,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate,
                totalPrice: totalPrice
            });
            await this.updateHotelAvailableRooms(hotel.id, rooms, reservationDocRef);

            return success();
        } catch (e) {
            return error(e.message); 
        }
    }
    
    async updateHotelAvailableRooms(hotelId, bookedRooms, reservationDocRef) {
        const hotelsCollectionRef = collection(db, 'hotels');
        const hotelDocRef = doc(hotelsCollectionRef, hotelId);
    
        const hotelDocSnapshot = await getDoc(hotelDocRef);
    
        if (hotelDocSnapshot.exists()) {
            const currentAvailableRooms = hotelDocSnapshot.data().availableRooms || 0;
    
            if (currentAvailableRooms >= bookedRooms) {
                await updateDoc(hotelDocRef, {
                    availableRooms: currentAvailableRooms - bookedRooms
                });
            } else {
                // Rezervasyonu geri al
                await deleteDoc(reservationDocRef);
                throw new Error('There are not enough rooms for this reservation.');
            }
        } else {
            throw new Error('Hotel is not found.');
        }
    }
    
}