import { firebase, db } from '../config';
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

export default class HotelService{
      
    async AddHotel(object, success, error){

        const hotelName = object["hotelName"];
        const hotelDescription = object["hotelDescription"];
        const services = object["services"];
        const location = object["location"];
        const price = object["price"];

        try{
            const hotelsCollectionRef = collection(db, 'hotels');
            await addDoc(hotelsCollectionRef, {
                name: hotelName,
                description: hotelDescription,
                services: services,
                location: location,
                price: price,
            }).then(() => {
                return success();
            });

        } catch(e) {
            return error(e);
        }

    }

    async DeleteHotel(object, success, error){
        const hotel = object["hotel"];
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

}